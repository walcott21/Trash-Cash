import BaseAppLayout from '@/layouts/baseAppLayout';
import DataGridPage from '@/layouts/dataGridPage';

import { getData } from '@/api';
import { useEffect, useState } from 'react';
import useSWR from 'swr';


export default function CollectionPoints() {
    const [searchField, setSearchField] = useState('');
    const { data, error, isLoading } = useSWR(`/collection_points/read?address=${searchField}`, getData)


    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const collection_points = data.reduce((acc: CollectionPoint[], curr: any) => {
        acc.push({
            id: curr._id,
            address: curr.address,
            type_of_trash: curr.type_of_trash
        })
        return acc
    }, [])

    const handleSearchClick = (data: string) => {
        console.log(searchField);
        setSearchField(data);
    };



    return (
        <BaseAppLayout>
            <DataGridPage
                title={'Collection Points'}
                endpoint={'http:abc'}
                add_route={'/app/collection-points/add-collection-point'}
                edit_route={'/app/collection-points/edit-collection-point'}
                rows={collection_points}
                searchFunction={handleSearchClick}
                columns={[
                    { field: 'address', headerName: 'Adress', width: 200 },
                    { field: 'type_of_trash', headerName: 'Types', width: 200 }
                ]} />
        </BaseAppLayout>
    );
}
