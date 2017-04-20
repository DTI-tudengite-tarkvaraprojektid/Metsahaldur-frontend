import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const styles = {
    headerDropdown: {
        backgroundColor: '#7CB342',
        float: 'right',
        margin:'10px',

        display:'inline-block',
    },
    headerButton: {
        backgroundColor: '#7CB342',
        float: 'left',
        margin:'10px',
        display:'inline-block',
        boarderRadius:'0px',

    },
    container: {
        padding:'30px',
        textAlign:'center',
        width:'100vw',
        position: 'fixed',

    },

};

export default class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }



    //handleChange = (event, index, value) => this.setState({value});

    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        return (
            <div className = "Header__wrapper" style={styles.container}>

                <RaisedButton label="Avaleht"
                              style={styles.headerButton}
                              backgroundColor= "#7CB342"
                              labelColor = "white" />

                <RaisedButton
                    onTouchTap={this.handleTouchTap}
                    label="Henry"
                    style={styles.headerDropdown}
                    backgroundColor= "#7CB342"
                    labelColor = "white"

                />

                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                >
                    <Menu>
                        <MenuItem primaryText="Seaded" />
                        <MenuItem primaryText="Logi välja" />
                    </Menu>
                </Popover>

                <h1>Metsahaldur 2.0</h1>
            </div>
        );
    }
}