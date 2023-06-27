import { getData } from '@/api';
import BaseAppLayout from '@/layouts/baseAppLayout';
import DataGridPage from '@/layouts/dataGridPage';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function Rewards() {
    const [searchField, setSearchField] = useState('');
    const { data, error, isLoading } = useSWR(`/rewards/read?name=${searchField}`, getData)

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const rewards = data.reduce((acc: Reward[], curr: any) => {
        acc.push({
            id: curr._id,
            name: curr.name,
            value: curr.value,
            image: curr.image,
            quantity: curr.quantity,
            claims: curr.claims.length
        })
        return acc
    }, [])

    const handleSearchClick = (data: string) => {
        console.log(searchField);
        setSearchField(data);
    };


    // name, claims, image, value, quantity

    return (
        <BaseAppLayout>
            <DataGridPage
                title={'Rewards'}
                endpoint={'http:abc'}
                add_route={'/app/rewards/add-reward'}
                edit_route={'/app/rewards/edit-reward'}
                rows={rewards}
                searchFunction={handleSearchClick}
                columns={[
                    { field: 'name', headerName: 'Name', width: 200 },
                    { field: 'value', headerName: 'Points', width: 200 },
                    { field: 'image', headerName: 'Icon', width: 200 },
                    { field: 'quantity', headerName: 'Quantity', width: 200 },
                    { field: 'claims', headerName: 'People Rewarded', width: 200 },
                ]} />
        </BaseAppLayout>
    );
}

