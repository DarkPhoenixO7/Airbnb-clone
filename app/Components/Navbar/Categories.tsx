
import {TbBeach, TbMountain} from 'react-icons/tb';
import {GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill} from 'react-icons/gi';
import {MdOutlineVilla, MdPool} from 'react-icons/md';
import {FaSkiing} from 'react-icons/fa';
import {BsSnow} from 'react-icons/bs';
import {IoDiamond} from 'react-icons/io5';
import Container from '../Container';
import CategoryBox from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';



export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: "This property is close to Beach !"
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: "This property has Windmills !"
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: "This property is Modern !"
    },
    {
        label: 'Mountain',
        icon: TbMountain,
        description: "This property is in the countryside !"
    },
    {
        label: 'Pool',
        icon: MdPool,
        description: "This property has a pool !"
    },
    {
        label: 'Island',
        icon: GiIsland,
        description: "This property is on an island !"
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: "This property has a Lake !"
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: "This property has skiing activities !"
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: "This property is in a Castle !"
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: "This property has camping activities !"
    },
    {
        label: 'Artic',
        icon: BsSnow,
        description: "This property is in snow !"
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: "This property is in cave !"
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: "This property is in desert !"
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: "This property is in barn !"
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: "This property is luxurious !"
    }
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';
    if(!isMainPage){
        return null;
    }
    return ( 
         <Container>
          <div className="
           flex
           flex-row
           pt-4
           items-center
           justify-between
           overflow-x-auto
           ">
            {categories.map((item)=>(
                <CategoryBox 
                key={item.label}
                label={item.label}
                selected={category=== item.label}
                icon={item.icon} />
            ))}

          </div>
          </Container>
        
     );
}
 
export default Categories;