export const SIGN_UP_FIELDS = [
    { id: 1, placeholder: "First Name", type: "text", required: true, name: "firstname" },
    { id: 2, placeholder: "Last Name", type: "text", required: true, name: "lastname" },
    { id: 3, placeholder: "Email", type: "email", required: true, name: "email" },
    { id: 4, placeholder: "Password", type: "password", required: true, name: "password" },
]
export const LOGIN_PAGE_FIELDS = [
    { id: 1, name: "email", placeholder: "Email Adress", required: true, type: "text" },
    { id: 2, name: "password", placeholder: "Password", required: true, type: "password" },
]
export const FORGOT_PASSWORD_PAGE_FIELDS = [
    { id: 1, name: "email", placeholder: "Email Adress", required: true, type: "text" },
]
export const UPDATE_PASSWORD_PAGE_FIELDS = [
    { id: 1, name: "password", placeholder: "New Password", required: true, type: "password" },
    { id: 2, name: "confirm_password", placeholder: "Confirm New Password", required: true, type: "password" },
]
export const CONTACT_PAGE_FIELDS = [
    { id: 1, name: "firstname", placeholder: "First Name", required: true, type: "text" },
    { id: 2, name: "lastname", placeholder: "Last Name", required: true, type: "text" },
    { id: 3, name: "email", placeholder: "Email", required: true, type: "email" },
    { id: 4, name: "message", placeholder: "Type your Message", required: true, type: "textarea" },
]
export const NAV_ITEMS = [
    { id: 1, placeholder: "First Name", type: "text", required: true, name: "fname" },
    { id: 2, placeholder: "Last Name", type: "text", required: true, name: "lname" },
    { id: 3, placeholder: "Email", type: "email", required: true, name: "email" },
    { id: 4, placeholder: "Password", type: "password", required: true, name: "password" },
]
export const SORTBY_OPTIONS = [
    { id: 1, name: "alphabetically A-Z", sortOrder: "asc", sortBy: "name" },
    { id: 2, name: "alphabetically Z-A", sortOrder: "desc", sortBy: "name" },
    { id: 3, name: "Price low to high", sortOrder: "asc", sortBy: "price" },
    { id: 4, name: "Price high to low", sortOrder: "desc", sortBy: "price" },
]
export const FILTERS_OPTIONS = []

export const CHECKOUT_PAGE_FIELDS = [
    { id: 1, placeholder: "First Name", type: "text", required: true, name: "firstname" },
    { id: 2, placeholder: "Last Name", type: "text", required: true, name: "lastname" },
    { id: 3, placeholder: "Email", type: "email", required: true, name: "email" },
    { id: 5, placeholder: "Street Address", type: "text", required: true, name: "street_address" },
    { id: 6, placeholder: "City", type: "text", required: true, name: "city" },
    { id: 8, placeholder: "Post/Zip Code", type: "number", required: true, name: "zip" },
    // { id: 4, placeholder: "Country", type: "select", required: true, name: "country" },
    // { id: 7, placeholder: "State/Province", type: "select", required: true, name: "state" },

]


export const HOME_ICONS_FEATURES = []

export const MANUAL_GATEWAY = [
    {
        id: "1",
        name: "Cash on Delivery",
    }
]

export const First_Issential_NAVIGATION = [
    { id: 1, name: "Home", slug: "/" }
]
export const LoggedInNavigations = [
    { id: 100, name: "My orders", slug: "/orders" },
    { id: 101, name: "Logout", slug: "/logout" }
]
export const LoggedOutNavigations = [
    { id: 200, name: "Account", slug: "/login" },
]

export const Rest_DEMO_NAVIGATION = [
    { id: 2, name: "About us", slug: "/pages/about-us" },
    // { id: 3, name: "Contact us", slug: "/contact-us" },
    // { id: 4, name: "Policies", slug: "/Policies" },
]
export const Rest_DEMO_NAVIGATION_2 = [
    { id: 3, name: "Contact us", slug: "contact-us" },
    { id: 4, name: "Policies", slug: "Policies" },
]