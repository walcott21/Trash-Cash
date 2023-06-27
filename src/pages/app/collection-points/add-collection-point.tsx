import BaseAppLayout from "@/layouts/baseAppLayout";
import CollectionItemPage from "@/layouts/collectionPointItemPage";

export default function AddCollection() {

    return (
        <BaseAppLayout>
            <CollectionItemPage endpoint={"abc"} edit={false} />
        </BaseAppLayout>
    )
}


