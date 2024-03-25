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
    { id: 8, placeholder: "Post/Zip Code", type: "text", required: true, name: "zip" },
    // { id: 4, placeholder: "Country", type: "select", required: true, name: "country" },
    // { id: 7, placeholder: "State/Province", type: "select", required: true, name: "state" },

]


export const HOME_ICONS_FEATURES = []

export const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]
export const MANUAL_GATEWAY = [
    {
        id: "1",
        name: "Cash on Delivery",
    }
]