// function
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// variable
const sidebarMenu = [
  {
    slug: 'staff',
    label: 'Staff',
    icon: 'las la-user-tag'
  },
  {
    slug: 'client',
    label: 'Client',
    icon: 'las la-user-friends'
  },
  {
    slug: 'invoice',
    label: 'Invoice',
    icon: 'la la-paste'
  }
]

const Helpers = {
  capitalizeFirstLetter,
  sidebarMenu
}

export default Helpers