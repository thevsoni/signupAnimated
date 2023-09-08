import Drawer from 'rc-drawer'
import React from 'react'

const MainDrawer = ({ drawerOpen, closeDrawer, children }) => {
    // console.log(drawerOpen)
    return (
        <Drawer
            // open={drawerOpen}
            open={false}
            onClose={closeDrawer}
            level={null}
            handle={false}
            placement='right'
        >
            {children}
        </Drawer>
    )
}

export default MainDrawer