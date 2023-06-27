import { updateData } from "@/api";
import Dropdown from "@/components/dropDown";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { getData } from '@/api';
import { useSnackbar } from "@/hooks/useSnackbar";
import ColItemPage from "@/layouts/collectionPointItemPage/itemPage";

interface Props {
    endpoint: string;
    edit: boolean;
}

export default function CollectionItemPage({ endpoint, edit }: Props) {
    const [collection_point, setCollectionPoint] = useState<CollectionPoint | undefined>(undefined);

    // Request data from backend
    const router = useRouter();
    const { id } = router.query;
    const { data, error, isLoading } = useSWR(`/collection_points/read?id=${id?.toString()}`, getData)


    useEffect(() => {
        if (edit && !isLoading) {

            const list = data.reduce((acc: CollectionPoint[], curr: any) => {
                acc.push({
                    id: curr._id,
                    address: curr.address,
                    type_of_trash: curr.type_of_trash
                })
                return acc
            }, [])
            setCollectionPoint(list[0])
        }
    }, [isLoading])

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    // Retorna o componente com o collection point
    console.log('Collection point index:', collection_point);
    return (
        <ColItemPage
            title={edit ? "Edit Collection Point" : "Add Collection Point"}
            edit={edit}
            endpoint={edit ? `/collection_points/update?id=${id?.toString()}` : "/collection_points/create"}
            deleteEndPoint={"/collection_points/delete"}
            buttonText={edit ? "SAVE" : "ADD"}
            collectionPoint={collection_point}
        />
    );
}


