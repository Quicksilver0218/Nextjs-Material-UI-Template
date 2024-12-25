import { getDictionary } from '@/app/dictionaries';
import { Home } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
 
export default async function Page({ params }: { params: Promise<{
  lang: string
}> }) {
  const dict = await getDictionary((await params).lang);
  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <div>
        <Typography variant="h1" align="center" marginTop={0}>{dict["PageNotFound"]}</Typography>
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Button href="/" variant="contained" size="large" startIcon={<Home />} style={{ minWidth: 180 }}>
            {dict["BackToHome"]}
          </Button>
        </Box>
      </div>
    </Box>
  );
};