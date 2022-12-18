import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import Navbar from '../Shared/Header/Navbar';
import '../Dashboard/Dashboard.css'

const DashBoardLayout = () => {

    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)

    return (
        <div className='dashboard'>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                    {/* <label htmlFor="dashboard-drawer" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}

                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-60 text-base-content">
                        {/* <li><Link to={`/dashboard/allUser`}>All User</Link></li> */}
                        {/* {
                            !isSeller && !isAdmin && <>
                                <li><Link to='/dashboard/myProducts'>My Products</Link></li>
                                <li><Link to='/dashboard/myWishlists'>My Wishlists</Link></li>
                            </>
                        }


                        {
                            isSeller && <>
                                <li><Link to="/dashboard/addProducts">Add Products</Link></li>
                                <li><Link to="/dashboard/sellerProducts">My Products</Link></li>
                            </>
                        } */}

                        {
                            isAdmin && <>
                                <li><Link to={`/dashboard/allUser`}>All User</Link></li>
                                <li><Link to={`/dashboard/addBanner`}>Add Banner</Link></li>
                                <li><Link to={`/dashboard/banner`}>Banner</Link></li>
                                <li><Link to={`/dashboard/addCategory`}>Add Category</Link></li>
                                <li><Link to={`/dashboard/category`}>My Category</Link></li>
                                <li><Link to={`/dashboard/allBuyer`}>All Buyers</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;