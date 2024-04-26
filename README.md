# External Libraries used

1) react spinner (for showing loading as the client receives the data)
2) react router dom (for routing to different pages)
3) react toastify (for showing notifications)
4) firebase (to connect to the firebase firestore database)



# Approach

1) Write down the number of pages and their functionalities first
    a) Homepage 
        1) will show the products list, whether the user is logged in or not
        2)  once the user clicks on any product, it should redirect to signup page or product page depending on if the user is logged in or not
        3) Has filter on the left side, to filter products based on the category, this filter is applied along with the serach bar results from the navbar as well
    b) Productpage
        1) When the user clicks on a particular product on the homepage, and if the user is signed in, it will redirect to this product page
        2) Contains info about the product, and there is option to add to the cart , by increasing the quantity, just like the amazon website
        3) The updated number of items added to the cart is shown on the cart icon in the navbar
    c) SignIn page
        1) When the user clicks on a particular product in the homepage and if the user is not signed in, it will redirect to this page
        2) if the user doesn't have an account or enters wrong details, it will show invalid username or password
        3) There is link for the signup page, if the user is new
    d) SignUp page
        1) Can be accessed only via signin page, if the user is new
        2) Asks for name, email, password and once the user signs in
        3) A new doc is created with the user's UID in the "users" collection of the database
        4) This doc has data like "orders,cart,cartcount,totalprice" , related to the users purchases
    e) Cart page
        1) This page displays the cart products and the total price of the cart items
        2) The user can change the quantity of the items or remove the item  and the total price changes accordingly
        3) Once the user is satisfied with the products in the cart, the user can press the "place order" button and it will register the orders in the database
        4) And then, it will redirect to orders page
    f) Error page
        1) Has been on the top of app component tree
        2) will show error page when something goes wrong


2) Write down the functionalities of each page, and each component
3) Tools used:
    a) custom hooks:
        1) useLoadingFetch for fetching the products on the homepage and also display the loading status (react-spinner), based on the loading true or false
        2) useNameEmailPassword , it just returns the email, name, password states along with their setStates, so instead of writing 3 lines of code in both signin or signup page, we can use this one line of custom hooks to set the state of name email or password in these pages
    b) react/react-router-dom hooks:
        1) useReducer:has been used in product page, for increasing or decreasing the quantity of the product, when it is clicked, the state here being the quantity
        2) useState: for setting the states of variables in the pages
        3) useEffect: Used when interacting with the database, since the operations are asynchronous, like fetching the data or updating the data of a particular user
        4) useNavigate: Used for navigating to home after the signup or singin, and also to redirect to the orders page once the "place orders" button is clicked
        5) useLocation: Used in Navbar component, because i want to show the search input in the navbar only on Homepage, where there are products, in other pages there are no products, so this searchbar is useless there
        6) useContext: Used in contexts for creating and using a context in the application
    c) Firebase/Firestore:
        1) setDocs: For setting the data for a newly created user
        2) getDoc: For fetching the data of a user
        3) updateDoc: For updating the data of a user
        4) onAuthStateChanged: Whenever the user signs in or signs out, this observer will change the state of the user accordingly
    d) Contexts

4) Firebase Schema:
    a) Collections:
        1) products: Since the products are common to all the users, whether signed in or not, this will have the product objects as an array
        2) users: This is the collection with each user being a document, the id being the user.uid
    c) Docs:
        1) Product item in the products collection has
            {
                name: 
                description: 
                price:
                catergory:
                imageurl:
            }
        2) User in the users collection has
            {
                orders: //map of the orders made , with the date being key and array of cartitems being the value
                totalpice:
                cart:
                cartcount:
            }
    

]

# Go Live

https://65c86bfeb95453eb6a0413fc--gentle-florentine-d13bfd.netlify.app/