class ScrollTable extends React.Component {
    render() {
        return (
        <BootstrapTable data={ products } height='120' scrollTop={ 'Bottom' }> 
            <TableHeaderColumn dataField='id' isKey>Product ID</TableHeaderColumn>
            <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
            <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
        </BootstrapTable>
        );
    }
}