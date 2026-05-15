import { NavLink } from "react-router"
function Header() {
  return (
    <nav className="bg-green-300 flex justify-between items-center px-5 py-3">
  
  <h1 className="text-3xl">LOGO</h1>

  <ul className="flex gap-4 items-center">
    <li>
      <NavLink to="" className={({isActive}) =>
        isActive ? "text-yellow-300 bg-amber-950 rounded-3xl p-2" : ""
      }>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="create-emp" className={({isActive}) =>
        isActive ? "text-yellow-300 bg-amber-950 rounded-3xl p-2" : ""
      }>
        CreateEmp
      </NavLink>
    </li>
    <li>
      <NavLink to="list" className={({isActive}) =>
        isActive ? "text-yellow-300 bg-amber-950 rounded-3xl p-2" : ""
      }>
        List of Employees
      </NavLink>
    </li>
  </ul>

</nav>
  )
}

export default Header