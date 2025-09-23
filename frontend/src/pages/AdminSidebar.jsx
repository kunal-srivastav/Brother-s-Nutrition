import { NavLink } from "react-router-dom";
import { Icon } from "../component/Icons";

function AdminSidebar({ closeSidebar }) {
  const linkClass = ({ isActive }) =>
    `d-flex align-items-center gap-2 text-decoration-none p-2 rounded ${
      isActive ? "bg-primary text-white" : "text-dark"
    }`;

  return (
    <ul className="nav flex-column">
      <li className="nav-item mb-2">
        <NavLink to="/admin/add-product" className={linkClass} onClick={closeSidebar}>
          <Icon name="Add" size={22} /> <span>Add Items</span>
        </NavLink>
      </li>

      <li className="nav-item mb-2">
        <NavLink to="/admin/product-list" className={linkClass} onClick={closeSidebar}>
          <Icon name="Checklist" size={20} /> <span>List Items</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/admin/order-list" className={linkClass} onClick={closeSidebar}>
          <Icon name="Clipboard" size={25} /> <span>Orders</span>
        </NavLink>
      </li>
    </ul>
  );
}

export default AdminSidebar;