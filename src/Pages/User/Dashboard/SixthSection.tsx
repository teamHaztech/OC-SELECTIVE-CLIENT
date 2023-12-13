import { Card, CardContent, Container, Stack, Paper, styled, Typography, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { BButton, OButton2 } from '../../../Components/Common/Button';
import { Header1, Header2 } from '../../../Components/Common/HeaderText';
import { ParaText3, ParaText1 } from '../../../Components/Common/ParaText';
import LoadingBar from '../../../Components/Headers/LoadingBar';
import UseGet from '../../../Hooks/UseGet';


type content = {
    test: string,
    validity: string,
    to: string,
    status: string,
}

const card_content: content[] = [
    { test: 'TOTAL EXAM', validity: '23/09/2022', to: '23/09/2022', status: 'Not completed' },
    { test: 'COMPLETED EXAMS', validity: '23/09/2022', to: '23/09/2022', status: 'Not completed' },
    { test: 'INCOMPLETED EXAMS', validity: '23/09/2022', to: '23/09/2022', status: 'Completed' },
    { test: 'MISSED EXAMS', validity: '23/09/2022', to: '23/09/2022', status: 'Not completed' },
    { test: 'REMAINING EXAMS', validity: '23/09/2022', to: '23/09/2022', status: 'Not completed' },
]

const SixthSection = () => {
    // const { isLoading, data, refetch } = useQuery({
    //     queryKey: [], queryFn: UseGet('https://dummyjson.com/products?limit=6'),
    // })
    
    
    // if(isLoading){
    //     return <LoadingBar />
    // }
    return (
        <Container maxWidth="xl" sx={{ my: '20px' }}>
            <Header1 header="PERFORMANCE ANALYSIS" />
            <Box sx={{ display: 'grid', gridTemplateColumns: { lg: 'auto auto auto auto auto', md: 'auto auto auto ', sm: 'auto auto ', xs: 'auto' }, gridGap: { lg: '20px', md: '20px', sm: '20px', xs: '20px' }, my: '30px' }}>
                {card_content.map((item: content,key) => {
                    return (<Card sx={{
                        Width: '100%', height: '306px', boxShadow: '3px 3px 15px 1px #808080',
                        borderBottom: '5px solid #3A9BDC', borderRight: '5px solid #3A9BDC', pt: '20px'
                    }} key={key}>
                        <CardContent sx={{ m: 'auto', textAlign: 'center' }}>
                            <Header2 header={item.test} css={{ mx: 'auto', my: '5px' }} />
                            <Stack direction="column" sx={{
                                width: '192px', height: '60px', fontWeight: '400',
                                m: 'auto'
                            }}>
                                <ParaText3 text="validity" />
                                <ParaText1 text={item.validity} />

                                <ParaText3 text="to" />
                                <ParaText1 text={item.to} />

                                <ParaText3 text="status" />
                                <ParaText1 text={item.status} />
                                <BButton name="Answer Test" css={{ my: '20px' }} />
                            </Stack>
                        </CardContent>

                    </Card>)
                })
                }
            </Box>
            <Box sx={{ width: '344px', mx: 'auto' }}>
                <Link to="/user">
                    <OButton2 name="VIEW MORE" css={{ maxWidth: '344px' }} />
                </Link>
            </Box>
        </Container>
    )
}

export default SixthSection
