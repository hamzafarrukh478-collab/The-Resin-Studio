/* =========================================================
   THE RESIN STUDIO — MAIN JAVASCRIPT
   File: main.js
   Full Website Functionality + Custom Product Popup
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. PAGE LOADER
    ===================================================== */

    const loader = document.querySelector(".loader");

    function hideLoader() {
        if (!loader) return;

        loader.classList.add("loaded");

        setTimeout(() => {
            loader.style.display = "none";
        }, 900);
    }

    if (loader) {
        window.addEventListener("load", () => {
            setTimeout(hideLoader, 400);
        });

        setTimeout(hideLoader, 2500);
    }


    /* =====================================================
       02. HEADER SCROLL EFFECT
    ===================================================== */

    const header = document.querySelector(".header");

    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
            header.classList.add("header-scrolled");
        } else {
            header.classList.remove("scrolled");
            header.classList.remove("header-scrolled");
        }
    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =====================================================
       03. MOBILE MENU
    ===================================================== */

    const menuButton =
        document.querySelector(".menu-button");

    const mobileMenu =
        document.querySelector(".mobile-menu");

    function closeMobileMenu() {

        document.body.classList.remove("menu-open");

        if (mobileMenu) {
            mobileMenu.classList.remove("open");
        }

        if (menuButton) {
            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Open menu"
            );
        }
    }


    function openMobileMenu() {

        document.body.classList.add("menu-open");

        if (mobileMenu) {
            mobileMenu.classList.add("open");
        }

        if (menuButton) {
            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );

            menuButton.setAttribute(
                "aria-label",
                "Close menu"
            );
        }
    }


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                if (
                    document.body.classList.contains(
                        "menu-open"
                    )
                ) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }

            }
        );

    }


    if (mobileMenu) {

        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    closeMobileMenu
                );

            });

    }


    /* =====================================================
       04. CUSTOMIZATION MODAL REFERENCES
    ===================================================== */

    const customizationModal =
        document.querySelector(
            "#customizationModal"
        );

    const customizationOverlay =
        document.querySelector(
            "#customizationOverlay, .customization-overlay"
        );

    const closeCustomization =
        document.querySelector(
            "#closeCustomization"
        );

    const cancelCustomization =
        document.querySelector(
            "#cancelCustomization"
        );

    const customizationProductName =
        document.querySelector(
            "#customizationProductName"
        );

    const customizationSummaryProduct =
        document.querySelector(
            "#customizationSummaryProduct"
        );

    const customizationSummaryPrice =
        document.querySelector(
            "#customizationSummaryPrice"
        );

    const customizationBasePrice =
        document.querySelector(
            "#customizationBasePrice"
        );

    const customizationExtraPrice =
        document.querySelector(
            "#customizationExtraPrice"
        );

    const customizationSummaryQuantity =
        document.querySelector(
            "#customizationSummaryQuantity"
        );

    const productNameText =
        document.querySelector(
            "#productNameText"
        );

    const productColor =
        document.querySelector(
            "#productColor"
        );

    const customColorField =
        document.querySelector(
            "#customColorField"
        );

    const productCustomColor =
        document.querySelector(
            "#productCustomColor"
        );

    const productAlphabet =
        document.querySelector(
            "#productAlphabet"
        );

    const alphabetField =
        document.querySelector(
            "#alphabetField"
        );

    const productDescription =
        document.querySelector(
            "#productDescription"
        );

    const productQuantity =
        document.querySelector(
            "#productQuantity"
        );

    const confirmAddToCart =
        document.querySelector(
            "#confirmAddToCart"
        );

    let selectedProduct = null;


    /* =====================================================
       05. ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }

            closeMobileMenu();

            if (
                customizationModal &&
                customizationModal.classList.contains("show")
            ) {
                closeCustomizationModal();
            }

        }
    );


    /* =====================================================
       06. PREMIUM CUSTOM CURSOR
    ===================================================== */

    const cursor =
        document.querySelector(".cursor");

    const cursorRing =
        document.querySelector(".cursor-ring");

    if (
        cursor &&
        cursorRing &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        let mouseX =
            window.innerWidth / 2;

        let mouseY =
            window.innerHeight / 2;

        let ringX = mouseX;
        let ringY = mouseY;


        document.addEventListener(
            "mousemove",
            event => {

                mouseX = event.clientX;
                mouseY = event.clientY;

                cursor.style.left =
                    `${mouseX}px`;

                cursor.style.top =
                    `${mouseY}px`;

            }
        );


        function animateCursor() {

            ringX +=
                (mouseX - ringX) * 0.15;

            ringY +=
                (mouseY - ringY) * 0.15;

            cursorRing.style.left =
                `${ringX}px`;

            cursorRing.style.top =
                `${ringY}px`;

            requestAnimationFrame(
                animateCursor
            );
        }

        animateCursor();


        const hoverTargets =
            document.querySelectorAll(
                "a, button, input, textarea, select, summary, .product-card, .collection-card"
            );


        hoverTargets.forEach(
            element => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        document.body.classList.add(
                            "cursor-hover"
                        );

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        document.body.classList.remove(
                            "cursor-hover"
                        );

                    }
                );

            }
        );

    }


    /* =====================================================
       07. SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .is-reveal"
        );


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                entry.target.classList.add(
                                    "is-visible"
                                );

                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       08. STAGGERED CARD ANIMATIONS
    ===================================================== */

    const animatedGrids =
        document.querySelectorAll(
            ".product-grid, .shop-grid, .collections-grid, .category-grid, .feature-grid, .three-column"
        );


    animatedGrids.forEach(
        grid => {

            const cards =
                grid.children;

            Array.from(cards).forEach(
                (card, index) => {

                    if (
                        !card.classList.contains(
                            "reveal"
                        )
                    ) {

                        card.classList.add(
                            "reveal"
                        );

                    }

                    card.style.transitionDelay =
                        `${index * 80}ms`;

                }
            );

        }
    );


    /* =====================================================
       09. SMOOTH INTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetID =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetID ||
                        targetID === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        });


    /* =====================================================
       10. ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    document
        .querySelectorAll(
            ".desktop-nav a, .mobile-menu a"
        )
        .forEach(link => {

            const href =
                link.getAttribute("href");

            if (!href) return;


            const cleanHref =
                href.split("#")[0];


            if (
                cleanHref === currentPage ||
                (
                    currentPage === "" &&
                    cleanHref === "index.html"
                ) ||
                (
                    currentPage === "index.html" &&
                    cleanHref === "./"
                )
            ) {

                link.classList.add(
                    "active"
                );

            }

        });


    /* =====================================================
       11. SHOP FILTER + SEARCH
    ===================================================== */

    const productCards =
        Array.from(
            document.querySelectorAll(
                ".product-card"
            )
        );


    const filterButtons =
        document.querySelectorAll(
            ".filter-button"
        );


    const shopSearch =
        document.querySelector(
            "#shopSearch, .shop-search input"
        );


    const noProducts =
        document.querySelector(
            "#noProducts"
        );


    let activeCategory = "all";
    let searchTerm = "";


    function updateProducts() {

        let visibleProducts = 0;


        productCards.forEach(
            card => {

                const category =
                    (
                        card.dataset.category ||
                        "all"
                    ).toLowerCase();


                const name =
                    (
                        card.dataset.name ||
                        card.querySelector(
                            "h3"
                        )?.textContent ||
                        ""
                    ).toLowerCase();


                const description =
                    (
                        card.dataset.description ||
                        ""
                    ).toLowerCase();


                const matchesCategory =
                    activeCategory === "all" ||
                    category === activeCategory;


                const matchesSearch =
                    !searchTerm ||
                    name.includes(searchTerm) ||
                    description.includes(searchTerm);


                if (
                    matchesCategory &&
                    matchesSearch
                ) {

                    card.style.display = "";
                    visibleProducts++;

                } else {

                    card.style.display = "none";

                }

            }
        );


        if (noProducts) {

            noProducts.style.display =
                visibleProducts === 0
                    ? ""
                    : "none";

        }

    }


    filterButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    filterButtons.forEach(
                        btn => {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    activeCategory =
                        (
                            button.dataset.filter ||
                            "all"
                        ).toLowerCase();


                    updateProducts();

                }
            );

        }
    );


    if (shopSearch) {

        shopSearch.addEventListener(
            "input",
            event => {

                searchTerm =
                    event.target.value
                        .trim()
                        .toLowerCase();


                updateProducts();

            }
        );

    }


    updateProducts();


    /* =====================================================
       12. IMAGE FALLBACK
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    image.style.display =
                        "none";

                    const parent =
                        image.parentElement;


                    if (parent) {

                        parent.classList.add(
                            "image-missing"
                        );

                    }

                }
            );

        });


    /* =====================================================
       13. CART SYSTEM
    ===================================================== */

    const CART_KEY =
        "resinStudioCart";


    function getCart() {

        try {

            const stored =
                localStorage.getItem(
                    CART_KEY
                );


            if (!stored) {
                return [];
            }


            const parsed =
                JSON.parse(stored);


            return Array.isArray(parsed)
                ? parsed
                : [];

        } catch (error) {

            console.error(
                "Cart loading error:",
                error
            );

            return [];

        }

    }


    function saveCart(cart) {

        try {

            localStorage.setItem(
                CART_KEY,
                JSON.stringify(cart)
            );

        } catch (error) {

            console.error(
                "Cart saving error:",
                error
            );

        }

    }


    /* =====================================================
       14. MODAL PRICE CALCULATION
    ===================================================== */

    function getNameCharge() {

        if (!productNameText) {
            return 0;
        }


        return productNameText.value.trim()
            ? 1
            : 0;

    }


    function getModalQuantity() {

        if (!productQuantity) {
            return 1;
        }


        const quantity =
            parseInt(
                productQuantity.value,
                10
            );


        return Number.isFinite(quantity) &&
            quantity >= 1
            ? quantity
            : 1;

    }


    function updateCustomizationSummary() {

        if (!selectedProduct) {
            return;
        }


        const basePrice =
            Number(
                selectedProduct.price
            ) || 0;


        const nameCharge =
            getNameCharge();


        const quantity =
            getModalQuantity();


        const unitPrice =
            basePrice + nameCharge;


        const finalTotal =
            unitPrice * quantity;


        if (customizationBasePrice) {

            customizationBasePrice.textContent =
                `${basePrice.toFixed(2)} SAR`;

        }


        if (customizationExtraPrice) {

            customizationExtraPrice.textContent =
                nameCharge > 0
                    ? `+${nameCharge.toFixed(2)} SAR`
                    : "+0.00 SAR";

        }


        if (customizationSummaryQuantity) {

            customizationSummaryQuantity.textContent =
                quantity;

        }


        if (customizationSummaryPrice) {

            customizationSummaryPrice.textContent =
                `${finalTotal.toFixed(2)} SAR`;

        }

    }


    /* =====================================================
       15. OPEN CUSTOMIZATION MODAL
    ===================================================== */

    function openCustomization(product) {

        selectedProduct =
            product;


        if (!customizationModal) {

            addToCart({
                ...product,
                nameOnItem: "",
                nameCharge: 0,
                color: "",
                customColor: "",
                alphabet: "",
                description: "",
                quantity: 1
            });

            return;

        }


        /* PRODUCT NAME */

        if (customizationProductName) {

            customizationProductName.textContent =
                product.name;

        }


        if (customizationSummaryProduct) {

            customizationSummaryProduct.textContent =
                product.name;

        }


        /* RESET NAME */

        if (productNameText) {

            productNameText.value = "";

        }


        /* RESET COLOR */

        if (productColor) {

            productColor.value = "";

        }


        /* RESET CUSTOM COLOR */

        if (productCustomColor) {

            productCustomColor.value = "";

        }


        if (customColorField) {

            customColorField.style.display =
                "none";

        }


        /* RESET ALPHABET */

        if (productAlphabet) {

            productAlphabet.value = "";

        }


        /* RESET DESCRIPTION */

        if (productDescription) {

            productDescription.value = "";

        }


        /* RESET QUANTITY */

        if (productQuantity) {

            productQuantity.value = 1;

        }


        /*
           Alphabet selector appears ONLY
           for the Alphabet Keychain.
        */

        const isAlphabetProduct =
            Boolean(
                product.isAlphabet ||
                product.alphabet ||
                product.name
                    .toLowerCase()
                    .includes("alphabet")
            );


        if (alphabetField) {

            alphabetField.style.display =
                isAlphabetProduct
                    ? "block"
                    : "none";

        }


        if (productAlphabet) {

            productAlphabet.required =
                isAlphabetProduct;

        }


        updateCustomizationSummary();


        /* SHOW MODAL */

        customizationModal.style.display =
            "flex";


        document.body.classList.add(
            "customization-open"
        );


        requestAnimationFrame(() => {

            customizationModal.classList.add(
                "show"
            );


            if (productNameText) {

                productNameText.focus();

            }

        });

    }


    /* =====================================================
       16. CLOSE CUSTOMIZATION MODAL
    ===================================================== */

    function closeCustomizationModal() {

        if (!customizationModal) {
            return;
        }


        customizationModal.classList.remove(
            "show"
        );


        document.body.classList.remove(
            "customization-open"
        );


        setTimeout(() => {

            if (
                customizationModal &&
                !customizationModal.classList.contains("show")
            ) {

                customizationModal.style.display =
                    "none";

            }

        }, 250);


        selectedProduct = null;

    }


    if (closeCustomization) {

        closeCustomization.addEventListener(
            "click",
            event => {

                event.preventDefault();

                closeCustomizationModal();

            }
        );

    }


    if (cancelCustomization) {

        cancelCustomization.addEventListener(
            "click",
            event => {

                event.preventDefault();

                closeCustomizationModal();

            }
        );

    }


    if (customizationOverlay) {

        customizationOverlay.addEventListener(
            "click",
            event => {

                event.preventDefault();

                closeCustomizationModal();

            }
        );

    }


    if (customizationModal) {

        customizationModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    customizationModal
                ) {

                    closeCustomizationModal();

                }

            }
        );

    }


    /* =====================================================
       17. CUSTOM COLOR TOGGLE
    ===================================================== */

    if (productColor) {

        productColor.addEventListener(
            "change",
            () => {

                if (
                    productColor.value ===
                    "Custom / Other"
                ) {

                    if (customColorField) {

                        customColorField.style.display =
                            "block";

                    }


                    if (productCustomColor) {

                        productCustomColor.focus();

                    }

                } else {

                    if (customColorField) {

                        customColorField.style.display =
                            "none";

                    }


                    if (productCustomColor) {

                        productCustomColor.value =
                            "";

                    }

                }

            }
        );

    }


    /* =====================================================
       18. NAME + QUANTITY LIVE PRICE UPDATE
    ===================================================== */

    if (productNameText) {

        productNameText.addEventListener(
            "input",
            updateCustomizationSummary
        );

    }


    if (productQuantity) {

        productQuantity.addEventListener(
            "input",
            updateCustomizationSummary
        );

        productQuantity.addEventListener(
            "change",
            updateCustomizationSummary
        );

    }


    /* =====================================================
       19. CONFIRM CUSTOMIZATION
       → ADD TO CART
    ===================================================== */

    if (confirmAddToCart) {

        confirmAddToCart.addEventListener(
            "click",
            event => {

                event.preventDefault();


                if (!selectedProduct) {

                    console.error(
                        "No product selected."
                    );

                    return;

                }


                /* NAME ON ITEM */

                const nameOnItem =
                    productNameText
                        ? productNameText.value.trim()
                        : "";


                /*
                   Name charge is +1 SAR
                   ONLY when a name is entered.
                */

                const nameCharge =
                    nameOnItem
                        ? 1
                        : 0;


                /* COLOR */

                const color =
                    productColor
                        ? productColor.value.trim()
                        : "";


                /* CUSTOM COLOR */

                const customColor =
                    productCustomColor
                        ? productCustomColor.value.trim()
                        : "";


                /* ALPHABET */

                const alphabet =
                    productAlphabet
                        ? productAlphabet.value.trim()
                        : "";


                /* DESCRIPTION */

                const description =
                    productDescription
                        ? productDescription.value.trim()
                        : "";


                /* QUANTITY */

                const quantity =
                    getModalQuantity();


                /*
                   Alphabet validation.
                */

                const isAlphabetProduct =
                    Boolean(
                        selectedProduct.isAlphabet ||
                        selectedProduct.name
                            .toLowerCase()
                            .includes("alphabet")
                    );


                if (
                    isAlphabetProduct &&
                    !alphabet
                ) {

                    alert(
                        "Please choose an alphabet."
                    );


                    if (productAlphabet) {

                        productAlphabet.focus();

                    }


                    return;

                }


                /*
                   Custom colour validation.
                */

                if (
                    color === "Custom / Other" &&
                    !customColor
                ) {

                    alert(
                        "Please enter your custom colour."
                    );


                    if (productCustomColor) {

                        productCustomColor.focus();

                    }


                    return;

                }


                /*
                   Store the UNIT price INCLUDING
                   the +1 SAR name charge.

                   Example:
                   Base = 5 SAR
                   Name = +1 SAR
                   Quantity = 3

                   Unit price = 6 SAR
                   Total = 18 SAR
                */

                const basePrice =
                    Number(
                        selectedProduct.basePrice ??
                        selectedProduct.price
                    ) || 0;


                const finalUnitPrice =
                    basePrice + nameCharge;


                addToCart({

                    ...selectedProduct,

                    basePrice,

                    price: finalUnitPrice,

                    nameOnItem,

                    nameCharge,

                    color,

                    customColor,

                    alphabet,

                    description,

                    quantity

                });


                closeCustomizationModal();

            }
        );

    }


    /* =====================================================
       20. CREATE CUSTOMIZATION ID
    ===================================================== */

    function createCustomizationID(product) {

        const customizationString = [

            product.nameOnItem || "",

            product.color || "",

            product.customColor || "",

            product.alphabet || "",

            product.description || ""

        ]
            .join("|")
            .toLowerCase()
            .trim();


        let hash = 0;


        for (
            let i = 0;
            i < customizationString.length;
            i++
        ) {

            hash =
                (
                    (
                        hash << 5
                    ) -
                    hash
                ) +
                customizationString.charCodeAt(i);


            hash |= 0;

        }


        return Math.abs(hash)
            .toString(36);

    }


    /* =====================================================
       21. ADD PRODUCT TO CART
    ===================================================== */

    function addToCart(product) {

        const cart =
            getCart();


        const baseID =
            product.id ||
            product.name
                .toLowerCase()
                .replace(
                    /[^a-z0-9]+/g,
                    "-"
                );


        const customizationID =
            createCustomizationID(
                product
            );


        const finalID =
            `${baseID}-${customizationID}`;


        const existing =
            cart.find(
                item =>
                    item.id === finalID
            );


        const quantity =
            Number(
                product.quantity || 1
            );


        if (existing) {

            existing.quantity +=
                quantity;

        } else {

            cart.push({

                ...product,

                id: finalID,

                quantity

            });

        }


        saveCart(cart);

        updateCartCount();


        showCartNotification(
            product.name,
            Number(product.price) * quantity
        );

    }


    /* =====================================================
       22. ADD TO CART BUTTONS
       IMPORTANT:
       preventDefault() prevents any page movement.
       The product button opens the modal only.
    ===================================================== */

    document
        .querySelectorAll(
            ".add-to-cart"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();


                    const card =
                        button.closest(
                            ".product-card"
                        );


                    if (!card) {
                        return;
                    }


                    const name =
                        button.dataset.product ||
                        card.dataset.name ||
                        card.querySelector(
                            "h3"
                        )?.textContent.trim() ||
                        "Resin Product";


                    const priceText =
                        button.dataset.price ||
                        card.dataset.price ||
                        card.querySelector(
                            ".product-price"
                        )?.textContent ||
                        "0";


                    const price =
                        parseFloat(
                            String(priceText)
                                .replace(
                                    /[^\d.]/g,
                                    ""
                                )
                        ) || 0;


                    const category =
                        button.dataset.category ||
                        card.dataset.category ||
                        "Product";


                    const image =
                        card.querySelector(
                            "img"
                        )?.getAttribute(
                            "src"
                        ) || "";


                    const baseID =
                        card.dataset.id ||
                        name
                            .toLowerCase()
                            .replace(
                                /[^a-z0-9]+/g,
                                "-"
                            );


                    const isAlphabet =
                        (
                            button.dataset.alphabet === "true" ||
                            card.dataset.alphabet === "true" ||
                            name
                                .toLowerCase()
                                .includes("alphabet")
                        );


                    const product = {

                        id: baseID,

                        name,

                        basePrice: price,

                        price,

                        category,

                        image,

                        isAlphabet

                    };


                    /*
                       Open popup.
                       NO scrollIntoView.
                       NO navigation.
                       NO page jump.
                    */

                    openCustomization(
                        product
                    );

                }
            );

        });


    /* =====================================================
       23. CART RENDERING
    ===================================================== */

    const cartItemsContainer =
        document.querySelector(
            ".cart-items"
        );


    function renderCart() {

        if (!cartItemsContainer) {
            return;
        }


        const cart =
            getCart();


        if (!cart.length) {

            cartItemsContainer.innerHTML = `

                <div class="empty-cart">

                    <h3>
                        Your cart is empty
                    </h3>

                    <p>
                        Add some handmade
                        resin pieces to your cart.
                    </p>

                    <a
                        href="shop.html"
                        class="primary-button">

                        Explore the Shop

                        <span>→</span>

                    </a>

                </div>

            `;


            updateCartTotals(0);

            return;

        }


        cartItemsContainer.innerHTML =
            cart.map(item => {

                const customizationDetails = [];


                if (item.nameOnItem) {

                    customizationDetails.push(`

                        <div>
                            <strong>Name on Item:</strong>
                            ${escapeHTML(
                                item.nameOnItem
                            )}
                            (+1 SAR)
                        </div>

                    `);

                }


                if (item.color) {

                    customizationDetails.push(`

                        <div>
                            <strong>Colour:</strong>
                            ${escapeHTML(
                                item.color
                            )}
                        </div>

                    `);

                }


                if (item.customColor) {

                    customizationDetails.push(`

                        <div>
                            <strong>Custom Colour:</strong>
                            ${escapeHTML(
                                item.customColor
                            )}
                        </div>

                    `);

                }


                if (item.alphabet) {

                    customizationDetails.push(`

                        <div>
                            <strong>Alphabet:</strong>
                            ${escapeHTML(
                                item.alphabet
                            )}
                        </div>

                    `);

                }


                if (item.description) {

                    customizationDetails.push(`

                        <div>
                            <strong>Request:</strong>
                            ${escapeHTML(
                                item.description
                            )}
                        </div>

                    `);

                }


                return `

                    <article class="cart-item">

                        <div class="cart-item-image">

                            ${
                                item.image
                                ?
                                `

                                <img
                                    src="${escapeHTML(item.image)}"
                                    alt="${escapeHTML(item.name)}"
                                >

                                `
                                :
                                ""
                            }

                        </div>


                        <div>

                            <div class="product-category">
                                ${escapeHTML(
                                    item.category ||
                                    "Product"
                                )}
                            </div>


                            <h3>
                                ${escapeHTML(
                                    item.name
                                )}
                            </h3>


                            <div class="cart-item-price">

                                ${Number(
                                    item.price
                                ).toFixed(2)}

                                SAR

                                ${
                                    Number(item.nameCharge || 0) > 0
                                    ? " / unit"
                                    : ""
                                }

                            </div>


                            ${
                                customizationDetails.length
                                ?

                                `

                                <div class="cart-customization">

                                    ${customizationDetails.join("")}

                                </div>

                                `
                                :
                                ""
                            }


                            <div class="quantity-controls">

                                <button
                                    type="button"
                                    data-minus="${escapeHTML(item.id)}"
                                    aria-label="Decrease quantity">

                                    −

                                </button>


                                <span>
                                    ${Number(
                                        item.quantity
                                    )}
                                </span>


                                <button
                                    type="button"
                                    data-plus="${escapeHTML(item.id)}"
                                    aria-label="Increase quantity">

                                    +

                                </button>

                            </div>

                        </div>


                        <div>

                            <strong>

                                ${(
                                    Number(item.price) *
                                    Number(item.quantity)
                                ).toFixed(2)}

                                SAR

                            </strong>


                            <button
                                type="button"
                                class="remove-item"
                                data-remove="${escapeHTML(item.id)}">

                                Remove

                            </button>

                        </div>

                    </article>

                `;

            }).join("");


        /* DECREASE */

        cartItemsContainer
            .querySelectorAll(
                "[data-minus]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        changeQuantity(
                            button.dataset.minus,
                            -1
                        );

                    }
                );

            });


        /* INCREASE */

        cartItemsContainer
            .querySelectorAll(
                "[data-plus]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        changeQuantity(
                            button.dataset.plus,
                            1
                        );

                    }
                );

            });


        /* REMOVE */

        cartItemsContainer
            .querySelectorAll(
                "[data-remove]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        removeFromCart(
                            button.dataset.remove
                        );

                    }
                );

            });


        /* TOTAL */

        const subtotal =
            cart.reduce(
                (total, item) =>
                    total +
                    (
                        Number(item.price) *
                        Number(item.quantity)
                    ),
                0
            );


        updateCartTotals(
            subtotal
        );

    }


    /* =====================================================
       24. REMOVE FROM CART
    ===================================================== */

    function removeFromCart(id) {

        const cart =
            getCart().filter(
                item =>
                    item.id !== id
            );


        saveCart(cart);

        renderCart();

        updateCartCount();

    }


    /* =====================================================
       25. CHANGE QUANTITY
    ===================================================== */

    function changeQuantity(
        id,
        amount
    ) {

        const cart =
            getCart();


        const item =
            cart.find(
                product =>
                    product.id === id
            );


        if (!item) {
            return;
        }


        item.quantity =
            Number(item.quantity) +
            amount;


        if (item.quantity <= 0) {

            removeFromCart(id);

            return;

        }


        saveCart(cart);

        renderCart();

        updateCartCount();

    }


    /* =====================================================
       26. UPDATE CART COUNT
    ===================================================== */

    function updateCartCount() {

        const cart =
            getCart();


        const count =
            cart.reduce(
                (total, item) =>
                    total +
                    Number(
                        item.quantity || 0
                    ),
                0
            );


        document
            .querySelectorAll(
                "[data-cart-count], .cart-count"
            )
            .forEach(element => {

                element.textContent =
                    count;

            });

    }


    /* =====================================================
       27. CART TOTALS
    ===================================================== */

    function updateCartTotals(
        subtotal
    ) {

        const subtotalElements =
            document.querySelectorAll(
                "[data-cart-subtotal], .cart-subtotal, #cartSubtotal"
            );


        subtotalElements.forEach(
            element => {

                element.textContent =
                    `${subtotal.toFixed(2)} SAR`;

            }
        );


        const totalElements =
            document.querySelectorAll(
                "[data-cart-total], .cart-total, .summary-total, #cartTotal"
            );


        totalElements.forEach(
            element => {

                element.textContent =
                    `${subtotal.toFixed(2)} SAR`;

            }
        );


        const countElements =
            document.querySelectorAll(
                "[data-cart-item-count], #cartItemCount"
            );


        const cart =
            getCart();


        const count =
            cart.reduce(
                (total, item) =>
                    total +
                    Number(item.quantity || 0),
                0
            );


        countElements.forEach(
            element => {

                element.textContent =
                    count;

            }
        );

    }


    /* =====================================================
       28. CART NOTIFICATION
    ===================================================== */

    function showCartNotification(
        name,
        totalPrice
    ) {

        let notification =
            document.querySelector(
                "#cartNotification, .cart-notification"
            );


        if (!notification) {

            notification =
                document.createElement(
                    "div"
                );


            notification.id =
                "cartNotification";


            notification.className =
                "cart-notification";


            document.body.appendChild(
                notification
            );

        }


        notification.innerHTML = `

            <strong>
                Added to cart
            </strong>

            <p>
                ${escapeHTML(name)}
                — ${Number(totalPrice).toFixed(2)} SAR
            </p>

            <a href="cart.html">
                View Cart →
            </a>

        `;


        notification.classList.add(
            "show"
        );


        clearTimeout(
            notification.hideTimer
        );


        notification.hideTimer =
            setTimeout(
                () => {

                    notification.classList.remove(
                        "show"
                    );

                },
                3500
            );

    }


    /* =====================================================
       29. INITIAL CART
    ===================================================== */

    updateCartCount();

    renderCart();


    /* =====================================================
       30. FAQ
    ===================================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    faqItems.forEach(
        item => {

            const summary =
                item.querySelector(
                    "summary"
                );


            if (!summary) {
                return;
            }


            summary.addEventListener(
                "click",
                () => {

                    faqItems.forEach(
                        otherItem => {

                            if (
                                otherItem !== item &&
                                otherItem.hasAttribute(
                                    "open"
                                )
                            ) {

                                otherItem.removeAttribute(
                                    "open"
                                );

                            }

                        }
                    );

                }
            );

        }
    );


    /* =====================================================
       31. GENERAL FORM HANDLING
    ===================================================== */

    document
        .querySelectorAll("form")
        .forEach(form => {

            form.addEventListener(
                "submit",
                event => {

                    /*
                       Customization form is controlled
                       entirely by the modal logic.
                    */

                    if (
                        form.id ===
                        "customizationForm"
                    ) {

                        event.preventDefault();

                        return;

                    }


                    const action =
                        form.getAttribute(
                            "action"
                        );


                    if (
                        action &&
                        action !== "#"
                    ) {

                        return;

                    }


                    event.preventDefault();


                    showFormMessage(
                        form,
                        "Thank you — your message has been received."
                    );

                }
            );

        });


    function showFormMessage(
        form,
        message
    ) {

        let messageElement =
            form.querySelector(
                ".form-success"
            );


        if (!messageElement) {

            messageElement =
                document.createElement(
                    "div"
                );


            messageElement.className =
                "form-success";


            form.appendChild(
                messageElement
            );

        }


        messageElement.textContent =
            message;


        messageElement.style.marginTop =
            "20px";


        messageElement.style.fontWeight =
            "700";

    }


    /* =====================================================
       32. CHECKOUT PAGE
    ===================================================== */

    const checkoutForm =
        document.querySelector(
            "#checkout-form"
        );


    if (checkoutForm) {

        checkoutForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const cart =
                    getCart();


                if (!cart.length) {

                    alert(
                        "Your cart is empty. Please add a product first."
                    );

                    return;

                }


                const formData =
                    new FormData(
                        checkoutForm
                    );


                let orderText =
                    "THE RESIN STUDIO — ORDER\n\n";


                orderText +=
                    "CUSTOMER DETAILS\n";


                for (
                    const [key, value]
                    of formData.entries()
                ) {

                    orderText +=
                        `${key}: ${value}\n`;

                }


                orderText +=
                    "\nORDER ITEMS\n";


                cart.forEach(
                    item => {

                        orderText +=
                            `\n${item.name} × ${item.quantity} — ${(
                                Number(item.price) *
                                Number(item.quantity)
                            ).toFixed(2)} SAR\n`;


                        if (item.nameOnItem) {

                            orderText +=
                                `Name on Item: ${item.nameOnItem}\n`;

                        }


                        if (item.color) {

                            orderText +=
                                `Colour: ${item.color}\n`;

                        }


                        if (item.customColor) {

                            orderText +=
                                `Custom Colour: ${item.customColor}\n`;

                        }


                        if (item.alphabet) {

                            orderText +=
                                `Alphabet: ${item.alphabet}\n`;

                        }


                        if (item.description) {

                            orderText +=
                                `Special Request: ${item.description}\n`;

                        }

                    }
                );


                const total =
                    cart.reduce(
                        (sum, item) =>
                            sum +
                            Number(item.price) *
                            Number(item.quantity),
                        0
                    );


                orderText +=
                    `\nTOTAL: ${total.toFixed(2)} SAR\n`;


                orderText +=
                    "\nPlease contact The Resin Studio to confirm the order.";


                const email =
                    "2339008068haf@gmail.com";


                const subject =
                    encodeURIComponent(
                        "New Resin Studio Order"
                    );


                const body =
                    encodeURIComponent(
                        orderText
                    );


                window.location.href =
                    `mailto:${email}?subject=${subject}&body=${body}`;

            }
        );

    }


    /* =====================================================
       33. CUSTOM ORDER FORM
       WHATSAPP FIRST → EMAIL FALLBACK
    ===================================================== */

    const customOrderForm =
        document.querySelector(
            "#customOrderForm"
        );


    if (customOrderForm) {

        customOrderForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const whatsappNumber =
                    "923314269040";


                const emailAddress =
                    "2339008068haf@gmail.com";


                const formData =
                    new FormData(
                        customOrderForm
                    );


                const customerName =
                    formData.get("customerName") ||
                    "Not provided";


                const customerPhone =
                    formData.get("customerPhone") ||
                    "Not provided";


                const customType =
                    formData.get("customType") ||
                    "Not specified";


                const quantity =
                    formData.get("quantity") ||
                    "1";


                const colors =
                    formData.get("colors") ||
                    "Not specified";


                const design =
                    formData.get("design") ||
                    "Not specified";


                const occasion =
                    formData.get("occasion") ||
                    "Not specified";


                const whatsappMessage =

`THE RESIN STUDIO — CUSTOM ORDER

CUSTOMER DETAILS
Name: ${customerName}
Phone / WhatsApp: ${customerPhone}

ORDER DETAILS
Item: ${customType}
Quantity: ${quantity}
Preferred Colors: ${colors}
Design: ${design}
Occasion / Purpose: ${occasion}

Please review this custom request and contact the customer to confirm the details and price.`;


                const emailSubject =
                    "New Custom Order — The Resin Studio";


                const emailBody =

`THE RESIN STUDIO — CUSTOM ORDER

CUSTOMER DETAILS
Name: ${customerName}
Phone / WhatsApp: ${customerPhone}

ORDER DETAILS
Item: ${customType}
Quantity: ${quantity}
Preferred Colors: ${colors}
Design: ${design}
Occasion / Purpose: ${occasion}

Please review this custom request and contact the customer to confirm the details and price.`;


                const encodedWhatsAppMessage =
                    encodeURIComponent(
                        whatsappMessage
                    );


                const whatsappURL =
                    `https://wa.me/${whatsappNumber}?text=${encodedWhatsAppMessage}`;


                const emailURL =
                    `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;


                const submitButton =
                    customOrderForm.querySelector(
                        'button[type="submit"]'
                    );


                const originalButtonHTML =
                    submitButton
                        ? submitButton.innerHTML
                        : "";


                if (submitButton) {

                    submitButton.disabled =
                        true;


                    submitButton.innerHTML =
                        "Opening WhatsApp <span>...</span>";

                }


                let whatsappWindow =
                    null;


                try {

                    whatsappWindow =
                        window.open(
                            whatsappURL,
                            "_blank",
                            "noopener,noreferrer"
                        );

                } catch (error) {

                    console.error(
                        "WhatsApp could not be opened:",
                        error
                    );

                }


                if (!whatsappWindow) {

                    showFormMessage(
                        customOrderForm,
                        "WhatsApp could not be opened. Opening email instead..."
                    );


                    setTimeout(
                        () => {

                            window.location.href =
                                emailURL;

                        },
                        700
                    );

                } else {

                    showFormMessage(
                        customOrderForm,
                        "Your custom order details are ready in WhatsApp. Please press Send to submit your request."
                    );


                    customOrderForm.reset();

                }


                setTimeout(
                    () => {

                        if (submitButton) {

                            submitButton.disabled =
                                false;


                            submitButton.innerHTML =
                                originalButtonHTML;

                        }

                    },
                    1500
                );

            }
        );

    }


    /* =====================================================
       34. WHATSAPP BUTTONS
    ===================================================== */

    document
        .querySelectorAll(
            "[data-whatsapp], .whatsapp-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    const message =
                        button.dataset.whatsapp ||
                        "Hello! I would like to ask about The Resin Studio.";


                    const phone =
                        "966545695712";


                    const url =
                        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;


                    if (
                        !button.hasAttribute(
                            "href"
                        ) ||
                        button.getAttribute(
                            "href"
                        ) === "#"
                    ) {

                        event.preventDefault();


                        window.open(
                            url,
                            "_blank",
                            "noopener,noreferrer"
                        );

                    }

                }
            );

        });


    /* =====================================================
       35. PRODUCT QUICK VIEW
    ===================================================== */

    document
        .querySelectorAll(
            "[data-product-link]"
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    const product =
                        link.dataset.productLink;


                    if (!product) {
                        return;
                    }


                    sessionStorage.setItem(
                        "selectedResinProduct",
                        product
                    );

                }
            );

        });


    /* =====================================================
       36. IMAGE PARALLAX
    ===================================================== */

    const parallaxElements =
        document.querySelectorAll(
            "[data-parallax]"
        );


    if (
        parallaxElements.length &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;


                parallaxElements.forEach(
                    element => {

                        const speed =
                            parseFloat(
                                element.dataset.parallax
                            ) || 0.08;


                        element.style.transform =
                            `translateY(${scroll * speed}px)`;

                    }
                );

            },
            { passive: true }
        );

    }


    /* =====================================================
       37. BUTTON RIPPLE
    ===================================================== */

    document
        .querySelectorAll(
            ".primary-button, .secondary-button, .button, .btn, .add-to-cart"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    const rect =
                        button.getBoundingClientRect();


                    const ripple =
                        document.createElement(
                            "span"
                        );


                    ripple.className =
                        "button-ripple";


                    ripple.style.left =
                        `${event.clientX - rect.left}px`;


                    ripple.style.top =
                        `${event.clientY - rect.top}px`;


                    button.appendChild(
                        ripple
                    );


                    setTimeout(
                        () => {

                            ripple.remove();

                        },
                        600
                    );

                }
            );

        });


    /* =====================================================
       38. COLLECTION CARDS
    ===================================================== */

    document
        .querySelectorAll(
            ".collection-card, .category-card"
        )
        .forEach(card => {

            card.addEventListener(
                "mouseenter",
                () => {

                    card.classList.add(
                        "hovered"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.classList.remove(
                        "hovered"
                    );

                }
            );

        });


    /* =====================================================
       39. CURRENT YEAR
    ===================================================== */

    document
        .querySelectorAll(
            "[data-current-year]"
        )
        .forEach(element => {

            element.textContent =
                new Date().getFullYear();

        });


    /* =====================================================
       40. PREVENT BROKEN # LINKS
    ===================================================== */

    document
        .querySelectorAll(
            'a[href="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                }
            );

        });


    /* =====================================================
       41. ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* =====================================================
       42. PAGE READY
    ===================================================== */

    document.body.classList.add(
        "js-ready"
    );


    console.log(
        "The Resin Studio — website JavaScript loaded successfully."
    );

});