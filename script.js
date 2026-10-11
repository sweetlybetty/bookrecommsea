document.addEventListener('DOMContentLoaded', () => {
    // 1. กำหนดข้อมูลตัวละครทั้ง 5 คน
    const characters = [
        {
            name: "พัค มูฮยอน",
            occupation: "ทันตแพทย์",
            desc: "ทันตแพทย์หนุ่มผู้เพิ่งเข้ามาทำงาน ณ สถานีใต้ทะเลนานาชาติแปซิฟิกเหนือ ได้เพียง 5 วัน น่ารัก จิตใจดี มีเมตตา ผู้มาโปรด พระเจ้าของเหล่าปวงชนทุกคน",
            img: "images/park_muhyun.jpg"
        },
        {
            name: "ชิน แฮรยัง",
            occupation: "หัวหน้าทีมเอนจีเนียร์ทีมคา",
            desc: "หัวหน้าทีมเอนจีเนียร์ ประเทศเกาหลี ผู้ที่เอาชนะทุกประเทศเพื่อที่จะให้เกาะแห่งนี้ชื่อ เกาะแทฮัน หน้าตาดี หล่อ แต่เป็นฮิปโปกับตู้เย็น",
            img: "images/shin_haeryung.jpg"
        },
        {
            name: "ซอ จีฮยอก",
            occupation: "เอนจีเนียร์ทีมคา",
            desc: "เอนจีเนียร์ซ่อมแซมสถานีใต้ทะเลลึก สัญชาติเกาหลี ตัวใหญ่เท่าฝาบ้าน ดูจิงโจ้แต่จริง ๆ ก็จริงจังอยู่ นักแม่นปืนเยี่ยม ๆ ขี้เล่นแต่ปากหมา",
            img: "images/seo_jihyuk.jpg"
        },
        {
            name: "แพค แอยอง",
            occupation: "เอนจีเนียร์ทีมคา",
            desc: "เอนจีเนียร์ซ่อมแซมสถานีใต้ทะเลลึก สัญชาติเกาหลี หน้าตาน่ารักเหมือนแมว เมี๊ยว ๆ รักผู้หญิง อึด ถึก ทน และวิ่งเร็วปานสายฟ้าอย่างกับยูเซน โบลต์",
            img: "images/baek_aeyeong.jpg"
        },
        {
            name: "ยู กึมอี",
            occupation: "นักวิจัย",
            desc: "นักชีววิทยาทางทะเล ผู้ที่โหยขนมปังมากที่สุด เป็นพิกกี้บู ๆ ของแม่ ฉลาดเป็นกรด วิจัยเกี่ยวกับสัตว์ใต้ทะเลลึก 3,000 เมตร",
            img: "images/yoo_keume.jpg"
        }
    ];
    let currentIndex = 0;

    // 2. ดึง DOM Elements
    const charImg = document.getElementById('charImg') || document.getElementById('characterImg');
    const charName = document.getElementById('charName');
    const charOccupation = document.getElementById('charOccupation');
    const charDesc = document.getElementById('charDesc');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const clickSound = document.getElementById('clickSound');
    const bubblesContainer = document.getElementById('bubblesContainer');
    const mediaGroup = document.querySelector('.character-media-group');

    // ฟังก์ชันเล่นเสียงคลิกที่ปลอดภัย
    function playSound() {
        if (typeof window.playSound === 'function') {
            window.playSound(850, 0.1, 0.08); // เรียกใช้ฟังก์ชันเล่นเสียงที่มีอยู่แล้วในหน้าเว็บ
        } else if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {});
        }
    }

    // ฟังก์ชันอัปเดตข้อมูลตัวละคร
    function updateCharacter(direction) {
        currentIndex = (currentIndex + direction + characters.length) % characters.length;
        const char = characters[currentIndex];

        if (charImg) {
            charImg.src = char.img;
            charImg.alt = char.name;
        }
        if (charName) charName.textContent = char.name;
        if (charOccupation) charOccupation.textContent = char.occupation;
        if (charDesc) charDesc.textContent = char.desc;
    }

    // ฟังก์ชันสร้าง Bubble ลอย
    function createBubble(x, y) {
        if (!bubblesContainer) return;
        
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const rect = bubblesContainer.getBoundingClientRect();
        const posX = x - rect.left;
        const posY = y - rect.top;

        bubble.style.left = `${posX}px`;
        bubble.style.top = `${posY}px`;

        bubblesContainer.appendChild(bubble);

        setTimeout(() => {
            bubble.remove();
        }, 1500);
    }

    // 3. ผูก Event Listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            playSound();
            updateCharacter(1);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            playSound();
            updateCharacter(-1);
        });
    }

    if (mediaGroup) {
        mediaGroup.addEventListener('click', (e) => {
            playSound();
            createBubble(e.clientX, e.clientY);
        });
    }

    // 4. สั่งแสดงผลตัวละครแรกทันทีเมื่อเปิดหน้าเว็บ
    updateCharacter(0);
});