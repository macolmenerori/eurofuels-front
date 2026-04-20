import { useTranslation } from 'react-i18next';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { FuelPricesData } from '../PricesTable.types';

export interface PricesTableComponentProps {
  tableData: FuelPricesData[];
}

export default function PricesTableComponent({ tableData }: PricesTableComponentProps) {
  const { t } = useTranslation();
  const pricesByCountry = tableData.map((fuelDataCountry) => {
    return <FuelsTableRow key={fuelDataCountry.country} {...fuelDataCountry} />;
  });

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 600, margin: '0 auto' }}>
      <Table aria-label={t('components.pricesTableComponent.aria')}>
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <Typography>
                <b>{t('components.pricesTableComponent.country')}</b>
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>
                <b>{t('components.pricesTableComponent.gasoline')}</b>
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>
                <b>{t('components.pricesTableComponent.diesel')}</b>
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{pricesByCountry}</TableBody>
      </Table>
    </TableContainer>
  );
}

function FuelsTableRow(fuelPricesData: FuelPricesData) {
  return (
    <TableRow hover={true}>
      <TableCell component="th" scope="row" align="left">
        {fuelPricesData.country}
      </TableCell>
      <TableCell component="td" align="center">
        {parseFloat(fuelPricesData.gasoline).toFixed(2)}
      </TableCell>
      <TableCell component="td" align="center">
        {parseFloat(fuelPricesData.diesel).toFixed(2)}
      </TableCell>
    </TableRow>
  );
}
