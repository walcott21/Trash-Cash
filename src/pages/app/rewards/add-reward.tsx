import BaseAppLayout from "@/layouts/baseAppLayout";
import RewardItemPage from "@/layouts/rewardItemPage";

export default function AddReward() {

    return (
        <BaseAppLayout>
            <RewardItemPage endpoint={"abc"} edit={false} />
        </BaseAppLayout>
    )
}


