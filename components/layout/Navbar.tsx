import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = () => {
    return (
        <header className='p-4 w-full bg-white'>
            <nav>
                <ul className='flex justify-end items-center'>
                    <li className='font-semibold mx-3 text-lg'>accounts@gammaedge.io</li>
                    <li className='font-bolder mx-3 text-lg cursor-pointer'>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar