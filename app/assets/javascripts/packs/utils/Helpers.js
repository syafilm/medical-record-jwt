// function
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function readablizeBytes(bytes){
  const size = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
  const estimation = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, estimation)).toFixed(2)} ${size[estimation]}`
}

const sidebarMenu = [
  {
    slug: 'staffs',
    label: 'Staffs',
    icon: 'las la-user-tag'
  },
  {
    slug: 'client',
    label: 'Clients',
    icon: 'las la-user-friends'
  },
  {
    slug: 'invoices',
    label: 'Invoices',
    icon: 'la la-paste'
  }
]

const detailTabStaff = [
  {
    slug: 'information',
    label: 'Information'
  },
  {
    slug: 'general',
    label: 'General'
  },
  {
    slug: 'price-settings',
    label: 'Price settings'
  },
  {
    slug: 'documents',
    label: 'Documents'
  },
  {
    slug: 'export',
    label: 'Export'
  }
]

const Helpers = {
  capitalizeFirstLetter,
  sidebarMenu,
  hexToRgb,
  readablizeBytes,
  detailTabStaff,
}

export default Helpers