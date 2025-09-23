import {
  Home,
  Grid,
  Mail,
  Info,
  ShoppingCart,
  Key,
  Settings,
  User,
  Edit3,
  LogOut,
  Box,
  Plus,          // instead of MdAdd
  CheckSquare,   // instead of GoChecklist
  ClipboardList,
  Trash2,
  EllipsisVertical, // instead of LuClipboardList
  Star,
  Menu,
  ArrowLeft,
  FolderUp,
  Pencil
} from "lucide-react";

// Centralized icon map
export const Icons = {
  Home,
  Collection: Grid,
  Contact: Mail,
  About: Info,
  Cart: ShoppingCart,
  Password: Key,
  Admin: Settings,
  User,
  Account: Edit3,
  Orders: Box,
  Logout: LogOut,
  Add: Plus,
  Checklist: CheckSquare,
  Clipboard: ClipboardList,
  Delete: Trash2,
  ThreeDots: EllipsisVertical,
  Star,
  Menu,
  ArrowLeft,
  FolderUp,
  Edit: Pencil
};

// Reusable Icon component
export function Icon({ name, className, size = 24, ...props }) {
  const IconComp = Icons[name];
  if (!IconComp) {
    console.warn(`Icon "${name}" does not exist`);
    return null;
  }
  return <IconComp className={className} size={size} {...props} />;
}


export function StarFull({ size = 25, color = "#FFD700" }) {
  return (
     <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 24 24"
    >
      <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27Z" />
    </svg>
  );
}

export function StarHalf({ size = 25, color = "#FFD700" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <defs>
        <linearGradient id="halfGrad">
          <stop offset="50%" stopColor={color} />
          <stop offset="50%" stopColor="lightgray" />
        </linearGradient>
      </defs>
      <path
        d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27Z"
        fill="url(#halfGrad)"
      />
    </svg>
  );
}

export function StarOutline({ size = 25, color = "#FFD700" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27Z" />
    </svg>
  );
}
