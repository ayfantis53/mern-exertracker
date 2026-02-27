// npm installs
import { Link } from 'react-router'; 


/** ----------------------------------------------------------------------------------------
 * 
 * @returns Navbar with links to navigate to all different pages
 * ----------------------------------------------------------------------------------------*/
export default function Navbar() {

    // html page.
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            {/* BRAND NAME */}
            <Link to='/' className='navbar-brand ms-3' role='link'> ExcerTracker </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                <span className="navbar-toggler-icon"></span>
            </button>
            {/* NAVBAR ITEMS*/}
            <div className='collapse navbar-collapse' id="navbarSupportedContent">
                <ul className='navbar-nav mr-auto'>
                    {/* NAVBAR ITEM #1 */}
                    <li className='nav-item'>
                        <Link to='/' className='nav-link' role='link'> Exercises </Link>
                    </li>
                    {/* NAVBAR ITEM #2 */}
                    <li className='nav-item'>
                        <Link to='/create' className='nav-link' role='link'> Create Exercises Log </Link>
                    </li>
                    {/* NAVBAR ITEM #3 */}
                    <li className='nav-item'>
                        <Link to='/user' className='nav-link' role='link'> Create User </Link>
                    </li>       
                </ul>
            </div>
        </nav>
    );
};