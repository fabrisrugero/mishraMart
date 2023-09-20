import Image from 'next/image';
import { FC } from 'react';
import PreviewModal from './PreviewModal';

interface ProductsListProps {
    Products: any[];
    ProductImages: any[];
    _id: string;
}

const ProductsList: FC<ProductsListProps> = ({ Products, ProductImages, _id }) => {
    // console.log(_id);
    return (
        <div className='p-2 grid grid-cols-3 gap-6 '>


            {Products
                .filter(({ categoryId }) => categoryId === _id)
                .map(({ name, categoryId, _id, price }) => (
                    <div key={_id} className=' relative  flex flex-col border shadow-xl rounded-xl gap-y-4 items-center '>
                        <div className='flex  flex-col items-center'>
                            <Image height={250} width={250} className=' avatar aspect-square  object-contain' src={ProductImages.find(({ productId }) => productId === _id)?.url} alt="" />
                        </div>
                        <div className='flex w-full p-2 rounded-xl text-green-900 font-bold shadow bg-green-300 items-center justify-between '>
                            <p className='text-sm'>{name}</p>
                            <PreviewModal _id={_id} categoryId={categoryId} price={price} src={ProductImages.find(({ productId }) => productId === _id)?.url} name={name} />
                        </div>


                    </div>
                ))}
        </div>
    );
};

export default ProductsList;
