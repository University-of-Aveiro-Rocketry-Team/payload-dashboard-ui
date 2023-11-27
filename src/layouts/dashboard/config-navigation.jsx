import SvgColor from 'src/components/svg-color';


const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'map',
    path: '/map',
    icon: icon('ic_map'),
  },
  {
    title: 'data',
    path: '/data',
    icon: icon('ic_data'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
