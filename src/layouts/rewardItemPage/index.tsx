import Dropzone from "@/components/dropZone";
import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import RewItemPage from "@/layouts/rewardItemPage/itemPage";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getData } from "@/api";

interface Props {
    endpoint: string;
    edit: boolean;
}

export default function RewardItemPage({ endpoint, edit }: Props) {

    const [reward, setReward] = useState<Reward | undefined>(undefined);

    // Request data from backend
    const router = useRouter();
    const { id } = router.query;
    const { data, error, isLoading } = useSWR(`/rewards/read?id=${id?.toString()}`, getData)


    useEffect(() => {
        if (edit && !isLoading) {

            const list = data.reduce((acc: Reward[], curr: any) => {
                acc.push({
                    id: curr._id,
                    name: curr.name,
                    value: curr.value,
                    image: curr.image,
                    quantity: curr.quantity,
                    claims: curr.claims
                })
                return acc
            }, [])
            setReward(list[0])
        }
    }, [isLoading])

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>



    return (
        <RewItemPage
            title={edit ? "Edit Reward" : "Add Reward"}
            edit={edit}
            endpoint={edit ? `/rewards/update?id=${id?.toString()}` : "/rewards/create"}
            deleteEndPoint={"/rewards/delete"}
            buttonText={edit ? "SAVE" : "ADD"}
            reward={reward}
        />
    );
}

