import BaseAppLayout from "@/layouts/baseAppLayout";
import CollectionItemPage from "@/layouts/collectionPointItemPage";

export default function EditCollection() {

    return (
        <BaseAppLayout>
            <CollectionItemPage endpoint={"abc"} edit={true} />
        </BaseAppLayout>
    )
}


