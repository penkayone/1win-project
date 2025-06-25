// Крутая поддержка: меню НЕ закрывается мгновенно
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

    function redistributeMenu() {
        for (const li of originalOrder) {
            navList.insertBefore(li, moreLi);
        }
        moreMenu.innerHTML = '';

        const navWidth = navList.offsetWidth - moreLi.offsetWidth - 20;
        let usedWidth = 0;
        let mustBeVisible = [];
        let mustGoToMore = [];

        if (window.innerWidth >= 1200) {
            moreLi.style.display = '';
        }

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

        if (mustGoToMore.length > 0 || window.innerWidth >= 1200) {
            moreLi.style.display = '';
        } else {
            moreLi.style.display = 'none';
        }

        if (mustGoToMore.length > 0) {
            toggleMoreArrow(true);
            moreLi.classList.remove('disabled');
        } else {
            toggleMoreArrow(false);
            moreLi.classList.add('disabled');
            moreLi.classList.remove('open');
        }
    }

    let canOpenMore = false;
    function updateMoreCanOpen() {
        canOpenMore = !moreLi.classList.contains('disabled');
    }

    moreLi.addEventListener('mouseenter', () => {
        updateMoreCanOpen();
        if (canOpenMore) moreLi.classList.add('open');
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