import { Avatar, ListItem, ListItemAvatar, ListItemText, List } from "@mui/material"
import useSWR from "swr";
import { getData } from '@/api';
import React, {useState, useEffect} from 'react';

export default function TrashByUser(){
    const trashCollected = useSWR(`/trash_collected/read`, getData)
    const [users, setUsers] = useState<any>([])

    useEffect(() => {
        if(!trashCollected.isLoading){
            (async () => {
                let dict:any = {}
                trashCollected.data.forEach((item:any) => {
                    if(dict[item.user_id]){
                        dict[item.user_id] = dict[item.user_id] + (item.weight)
                    }else{
                        dict[item.user_id] = item.weight
                    }
                })

                let users:any = []
                for(const key in dict){
                    const user = await getData(`/user/${key}`)
                    users.push({weight: dict[key], name: user.name, id: user._id})
                }
                
                setUsers(users)
            })();
        }
    }, [trashCollected.isLoading]);

    if (trashCollected.error) return <div>failed to load</div>
    if (trashCollected.isLoading) return <div>loading...</div>

    return (
        <List style={style.list}>
            {
                users.map((user:any) => {
                    return(
                        <ListItem key={user.id} >
                            <ListItemAvatar>
                                <Avatar>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={user.name} />
                            <ListItemText 
                                primary={`${user.weight} Kg`}
                                style={style.align}
                                
                            />
                        </ListItem>
                    )
                })
            }
        </List>
    )
}

const style = {
    align: {
        textAlign: "right",
    },
    list:{
        borderRadius: "8px",
        backgroundColor: "#2c3c352e",
        boxShadow: "#000 0 0 3px 0px"
    },
}