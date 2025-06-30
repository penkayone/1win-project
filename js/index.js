const countryBlock = document.querySelector('.footer__country');
countryBlock.addEventListener('mouseenter', () => {
    countryBlock.classList.add('footer__country--open');
});
countryBlock.addEventListener('mouseleave', () => {
    countryBlock.classList.remove('footer__country--open');
});

document.addEventListener('DOMContentLoaded', function() {
    const navList = document.querySelector('.header__nav-list');
    const navItems = Array.from(navList.children).filter(
        li => !li.classList.contains('nav-dropdown-more')
    );
    const moreLi = navList.querySelector('.nav-dropdown-more');
    const moreMenu = moreLi.querySelector('.dropdown__menu');
    const casinoLi = navList.querySelector('.header__nav-dropdown--casino');
    const moreArrow = moreLi.querySelector('.dropdown__arrow');
    const originalOrder = navItems.slice();

    function toggleMoreArrow(show) {
        if (show) {
            moreArrow.style.display = '';
            moreLi.classList.remove('header__nav-link--noarrow');
        } else {
            moreArrow.style.display = 'none';
            moreLi.classList.add('header__nav-link--noarrow');
        }
    }

    function adjustDropdownPosition() {
        const container = document.querySelector('.container');
        const menu = moreMenu;
        if (!menu || menu.children.length === 0) return;

        menu.style.right = '';
        menu.style.left = '';

        const menuRect = menu.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        if (menuRect.right > containerRect.right) {
            menu.style.right = '0';
            menu.style.left = 'auto';
        } else {
            menu.style.right = '';
            menu.style.left = '';
        }
    }

    function redistributeMenu() {
        for (const li of originalOrder) {
            navList.insertBefore(li, moreLi);
        }
        moreMenu.innerHTML = '';

        if (window.innerWidth >= 1200) {
            moreLi.style.display = 'none';
            toggleMoreArrow(false);
            moreLi.classList.add('disabled');
            moreLi.classList.remove('open');
            return;
        }

        const navWidth = navList.offsetWidth - moreLi.offsetWidth - 20;
        let usedWidth = 0;
        let mustBeVisible = [];
        let mustGoToMore = [];

        if (window.innerWidth < 900) {
            for (const li of navItems) {
                if (li === casinoLi) {
                    mustBeVisible.push(li);
                } else {
                    mustGoToMore.push(li);
                }
            }
        } else {
            for (let i = 0; i < navItems.length; i++) {
                const li = navItems[i];
                if (i < 3 || li === casinoLi) {
                    mustBeVisible.push(li);
                    usedWidth += li.offsetWidth;
                }
            }
            for (let i = 0; i < navItems.length; i++) {
                const li = navItems[i];
                if (mustBeVisible.includes(li)) continue;
                usedWidth += li.offsetWidth;
                if (usedWidth < navWidth) {
                    mustBeVisible.push(li);
                } else {
                    mustGoToMore.push(li);
                }
            }
        }

        mustGoToMore.forEach(li => {
            moreMenu.appendChild(li);
        });

        if (mustGoToMore.length > 0) {
            moreLi.style.display = '';
            toggleMoreArrow(true);
            moreLi.classList.remove('disabled');
        } else {
            moreLi.style.display = 'none';
            toggleMoreArrow(false);
            moreLi.classList.add('disabled');
            moreLi.classList.remove('open');
        }
        setTimeout(adjustDropdownPosition, 10);
    }

    let canOpenMore = false;
    function updateMoreCanOpen() {
        canOpenMore = !moreLi.classList.contains('disabled');
    }

    moreLi.addEventListener('mouseenter', () => {
        updateMoreCanOpen();
        if (canOpenMore) {
            moreLi.classList.add('open');
            adjustDropdownPosition();
        }
    });
    moreLi.addEventListener('mouseleave', () => {
        moreLi.classList.remove('open');
    });
    moreLi.addEventListener('click', (e) => {
        updateMoreCanOpen();
        if (!canOpenMore) {
            e.preventDefault();
            return false;
        }
        moreLi.classList.toggle('open');
        adjustDropdownPosition();
        e.preventDefault();
    });

    window.addEventListener('resize', () => {
        redistributeMenu();
        updateMoreCanOpen();
    });

    setTimeout(() => {
        redistributeMenu();
        updateMoreCanOpen();
    }, 150);
});

document.addEventListener('DOMContentLoaded', function() {
    const countryBlock = document.querySelector('.footer__country');
    const countryBtn = document.getElementById('countryBtn');
    function handleMobileClick(e) {
        if (window.innerWidth <= 900) {
            e.preventDefault();
            countryBlock.classList.toggle('footer__country--open');
        }
    }
    function handleDocumentClick(e) {
        if (
            window.innerWidth <= 900 &&
            countryBlock.classList.contains('footer__country--open') &&
            !countryBlock.contains(e.target)
        ) {
            countryBlock.classList.remove('footer__country--open');
        }
    }
    countryBlock.addEventListener('mouseenter', () => {
        if (window.innerWidth > 900) {
            countryBlock.classList.add('footer__country--open');
        }
    });
    countryBlock.addEventListener('mouseleave', () => {
        if (window.innerWidth > 900) {
            countryBlock.classList.remove('footer__country--open');
        }
    });
    countryBtn.addEventListener('click', handleMobileClick);
    document.addEventListener('click', handleDocumentClick);
});

document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('.mobile-bottom-nav__item--menu').addEventListener('click', function(e){
        e.preventDefault();
        document.getElementById('mobileMenu').style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    document.getElementById('closeMenu').onclick = function(){
        document.getElementById('mobileMenu').style.display = 'none';
        document.body.style.overflow = '';
    };

    document.getElementById('mobileMenu').addEventListener('click', function(e){
        if(e.target === this){
            this.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.querySelector('.menu-dropdown');
    const toggle = dropdown.querySelector('.menu-dropdown__toggle');
    toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdown.classList.toggle('open');
    });

    document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });
});