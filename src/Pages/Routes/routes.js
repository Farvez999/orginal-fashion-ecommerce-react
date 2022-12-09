import { createBrowserRouter } from "react-router-dom"
import AddBanner from "../Dashboard/Banner/AddBanner"
import AllUser from "../Dashboard/AllUser"
import Dashboard from "../Dashboard/Dashboard"
import Home from "../Home/Home"
import DashBoardLayout from "../Layout/DashBoardLayout"
import Main from "../Layout/Main"
import Login from "../Login/Login"
import SignUp from "../Login/SignUp"
import AdminRoute from "./AdminRoutes"
import PrivateRoutes from "./PrivateRoutes"
import Banner from "../Home/Banner"
import MyBanner from "../Dashboard/Banner/MyBanner"

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        //   errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            // {
            //     path: '/blog',
            //     element: <Blog />,
            // },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <SignUp />,
            },
            // {
            //     path: "/categorie/:id",
            //     element: <PrivateRoutes><CategoryDetails></CategoryDetails></PrivateRoutes>,
            //     loader: ({ params }) =>
            //         fetch(
            //             `https://used-products-resale-server-vert.vercel.app/categorie/${params.id}`
            //         ),
            // },
        ],
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><DashBoardLayout></DashBoardLayout></PrivateRoutes>,
        // errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            // {
            //     path: '/dashboard/myProducts',
            //     element: <MyProducts></MyProducts>
            // },
            // {
            //     path: '/dashboard/myWishlists',
            //     element: <MyWishlists></MyWishlists>
            // },
            // {
            //     path: '/dashboard/addProducts',
            //     element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            // },
            // {
            //     path: '/dashboard/sellerProducts',
            //     element: <SellerRoute><SellerProducts></SellerProducts></SellerRoute>
            // },

            {
                path: '/dashboard/allUser',
                element: <AdminRoute><AllUser></AllUser></AdminRoute>
            },
            {
                path: '/dashboard/addBanner',
                element: <AdminRoute><AddBanner></AddBanner></AdminRoute>
            },
            {
                path: '/dashboard/banner',
                element: <AdminRoute><MyBanner></MyBanner></AdminRoute>
            },
            // {
            //     path: '/dashboard/allBuyer',
            //     element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            // },
            // {
            //     path: '/dashboard/adddoctor',
            //     element: <AdminRoutes><AddDoctor></AddDoctor></AdminRoutes>
            // },
            // {
            //     path: '/dashboard/managedoctors',
            //     element: <AdminRoutes><ManageDoctors></ManageDoctors></AdminRoutes>
            // },
            // {
            //     path: '/dashboard/payment/:id',
            //     element: <Payment></Payment>,
            //     loader: ({ params }) => fetch(`https://used-products-resale-server-vert.vercel.app/bookings/${params.id}`)
            // },

        ]
    },
    // {
    //     path: "*",
    //     element: <ErrorPage></ErrorPage>
    // },
])

export default router