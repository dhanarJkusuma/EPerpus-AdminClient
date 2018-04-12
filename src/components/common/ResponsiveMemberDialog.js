import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

class ResponsiveMemberCard extends React.Component {

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title"> Detail Member </DialogTitle>
          <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Header</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>{ this.props.member.publicId != null ? this.props.member.publicId : "N/A" }</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Nama</TableCell>
                <TableCell>{ this.props.member.name != null ? this.props.member.name : "N/A" }</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>No. HP</TableCell>
                <TableCell>{ this.props.member.phone != null ? this.props.member.phone: "N/A" }</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Alamat</TableCell>
                <TableCell>{ this.props.member.address != null ? this.props.member.address : "N/A" }</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{ this.props.member.email != null ? this.props.member.email : "N/A" }</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tempat Kerja</TableCell>
                <TableCell>{ this.props.member.company != null ? this.props.member.company : "N/A" }</TableCell>
              </TableRow>
            </TableBody>
           </Table>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color="primary" autoFocus>
              Tutup
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ResponsiveMemberCard.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  member: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withMobileDialog()(ResponsiveMemberCard);
