import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



const TableView = ( props ) => {
    const products= props.products;
    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });
      
      function deleteProuct(event, id){
          console.log(event,id)
          const url=`http://localhost:5055/deletephone/${id}`;
          console.log(url)
        fetch(url,{
            method: 'DELETE',
        })
        .then( res => res.json())
        .then(result =>{
            if(result){
                event.target.parentNode.parentNode.style.display = 'none';
            }
        })
    }
    const rows = products;
    const classes = useStyles();
    return (
        <div>
            <h1>table</h1>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Phone Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right"><img onClick={()=>deleteProuct(event,`${row._id}`)} src="https://i.ibb.co/HXNMJHg/Group-33150.png" alt=""/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    );
};

export default TableView;