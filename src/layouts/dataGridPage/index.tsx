import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel, GridRowsProp } from '@mui/x-data-grid';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { useRouter } from 'next/router';


interface Props {
    title: string;
    endpoint: string;
    add_route: string;
    edit_route: string;
    rows: GridRowsProp;
    columns: GridColDef[];
    searchFunction: (data: string) => void;
}

export default function DataGridPage({
    title,
    endpoint,
    rows,
    columns,
    add_route,
    edit_route,
    searchFunction,
}: Props) {
    const [searchValue, setSearchValue] = useState<string>('');
    const [page, setPage] = useState(0);
    const router = useRouter();

    function handlePageChange(params: GridPaginationModel) {
        setPage(params.page);
        // Call api to get data for new page
    }

    const handleRowClick = (row: any) => {
        console.log(row['id']);
        router.push({
            pathname: edit_route,
            query: { id: row.id },
        });
    };



    return (
        <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="left"
            spacing={5}
            margin={1}
        >
            <Grid item container direction="row" spacing={1}>
                <Grid item><Typography variant='h1'>{title}</Typography></Grid>
                <Grid item>
                    <Link href={add_route}>
                        <IconButton aria-label="addButton">
                            <AddIcon />
                        </IconButton>
                    </Link>
                </Grid>
            </Grid>
            <Grid
                item container
                direction="row"
                justifyContent="space-between"
                alignItems="left"
            >
                <Grid container item direction="row" spacing={1}>
                    <Grid item>
                        <TextField
                            id="outlined-helperText"
                            value={searchValue}
                            label="Search"
                            type='search'
                            style={{ height: '50px', width: '300px' }}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setSearchValue(event.target.value) }}

                        />
                    </Grid>

                    <Grid item>
                        <IconButton aria-label="searchButton" onClick={() => searchFunction(searchValue)}>
                            <SearchIcon />
                        </IconButton>
                    </Grid>

                </Grid>
            </Grid>
            <Grid item container width={800} height={400}>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    onRowClick={(row) => handleRowClick(row)}
                    paginationModel={{ page: page, pageSize: 5 }}
                    onPaginationModelChange={(params) => { handlePageChange(params) }}
                />
            </Grid>

        </Grid>

    )
}


