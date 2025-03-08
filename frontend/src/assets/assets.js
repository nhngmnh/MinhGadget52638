import p_img1 from './p_img1.png'
import p_img2_1 from './p_img2_1.png'
import p_img2_2 from './p_img2_2.png'
import p_img2_3 from './p_img2_3.png'
import p_img2_4 from './p_img2_4.png'
import p_img3 from './p_img3.png'
import p_img4 from './p_img4.png'
import p_img5 from './p_img5.png'
import p_img6 from './p_img6.png'
import p_img7 from './p_img7.png'
import p_img8 from './p_img8.png'
import p_img9 from './p_img9.png'
import p_img10 from './p_img10.png'
import p_img11 from './p_img11.png'
import p_img12 from './p_img12.png'
import p_img13 from './p_img13.png'
import p_img14 from './p_img14.png'
import p_img15 from './p_img15.png'
import p_img16 from './p_img16.png'
import p_img17 from './p_img17.png'
import p_img18 from './p_img18.png'
import p_img19 from './p_img19.png'
import p_img20 from './p_img20.png'
import p_img21 from './p_img21.png'
import p_img22 from './p_img22.png'
import p_img23 from './p_img23.png'
import p_img24 from './p_img24.png'
import p_img25 from './p_img25.png'
import p_img26 from './p_img26.png'
import p_img27 from './p_img27.png'
import p_img28 from './p_img28.png'
import p_img29 from './p_img29.png'
import p_img30 from './p_img30.png'
import p_img31 from './p_img31.png'
import p_img32 from './p_img32.png'
import p_img33 from './p_img33.png'
import p_img34 from './p_img34.png'
import p_img35 from './p_img35.png'
import p_img36 from './p_img36.png'
import p_img37 from './p_img37.png'
import p_img38 from './p_img38.png'
import p_img39 from './p_img39.png'
import p_img40 from './p_img40.png'
import p_img41 from './p_img41.png'
import p_img42 from './p_img42.png'
import p_img43 from './p_img43.png'
import p_img44 from './p_img44.png'
import p_img45 from './p_img45.png'
import p_img46 from './p_img46.png'
import p_img47 from './p_img47.png'
import p_img48 from './p_img48.png'
import p_img49 from './p_img49.png'
import p_img50 from './p_img50.png'
import p_img51 from './p_img51.png'
import p_img52 from './p_img52.png'

import avatar from './avatar.png'
import logo from './logo.png'
import hero_img from './hero_img.png'
import cart_icon from './cart_icon.png'
import bin_icon from './bin_icon.png'
import dropdown_icon from './dropdown_icon.png'
import exchange_icon from './exchange_icon.png'
import profile_icon from './profile_icon.png'
import quality_icon from './quality_icon.png'
import search_icon from './search_icon.png'
import star_dull_icon from './star_dull_icon.png'
import star_icon from './star_icon.png'
import support_img from './support_img.png'
import menu_icon from './menu_icon.png'
import about_img from './about_img.png'
import contact_img from './contact_img.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import cross_icon from './cross_icon.png'
import bg from './bg.jpg'
export const assets = {
    bg,
    avatar,
    logo,
    hero_img,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    bin_icon,
    support_img,
    menu_icon,
    about_img,
    contact_img,
    razorpay_logo,
    stripe_logo,
    cross_icon
}

export const typeOfProductData = [
    {
        type: 'Laptop',
        image: menu_icon
    },
    {
        type: 'Smartphone',
        image: menu_icon
    },
    {
        type: 'Accessory',
        image: menu_icon
    },
    {
        type: 'PC, Printer',
        image: menu_icon
    },
    {
        type: 'Smartwatch',
        image: menu_icon
    },
    {
        type: 'Tablet',
        image: menu_icon
    },
]
export const branch = [
    {
        name: 'Apple',
        image: menu_icon
    },
    {
        name: 'Samsung',
        image: menu_icon
    },
    {
        name: 'DELL',
        image: menu_icon
    },
    {
        name: 'Lenovo',
        image: menu_icon
    },
    {
        name: 'Oppo',
        image: menu_icon
    },
    {
        name: 'Xiaomi',
        image: menu_icon
    },
    {
        name: 'realme',
        image: menu_icon
    },
    {
        name: 'Vivo',
        image: menu_icon
    },
    {
        name: 'ASUS',
        image: menu_icon
    },
    {
        name: 'ACER',
        image: menu_icon
    },
]
export const products = [
    {
        _id: "aaaaa",
        name: "Women Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 100,
        image: [p_img1],
        category: "Laptop",
        branch:"ASUS",
        number: 20,
        date: 1716634345448,
        bestseller: true
    },
    {
        _id: "aaaab",
        name: "Men Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 200,
        image: [p_img2_1,p_img2_2,p_img2_3,p_img2_4],
        category: "Laptop",
        branch:"ACER",
        number: 20,
        date: 1716621345448,
        bestseller: true
    },
    {
        _id: "aaaac",
        name: "Girls Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 220,
        image: [p_img3],
        category: "Smartphone",
        branch:"Oppo",
        number: 20,
        date: 1716234545448,
        bestseller: true
    },
    {
        _id: "aaaad",
        name: "Men Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 110,
        image: [p_img4],
        category: "PC, Printer",
        branch:"ASUS",
        number: 2,
        date: 1716621345448,
        bestseller: true
    },
    {
        _id: "aaaae",
        name: "Women Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 130,
        image: [p_img5],
        category: "Tablet",
        branch:"ASUS",
        number: 10,
        date: 1716622345448,
        bestseller: true
    },
    {
        _id: "aaaaf",
        name: "Women Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 130,
        image: [p_img5],
        category: "Laptop",
        branch:"DELL",
        number: 10,
        date: 1716622345448,
        bestseller: true
    },
]