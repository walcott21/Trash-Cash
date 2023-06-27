import BaseAppLayout from "@/layouts/baseAppLayout";
import RewardItemPage from "@/layouts/rewardItemPage";

export default function EditReward() {

    return (
        <BaseAppLayout>
            <RewardItemPage endpoint={"abc"} edit={true} />
        </BaseAppLayout>
    )
}


