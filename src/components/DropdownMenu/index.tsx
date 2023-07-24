import {Root, Trigger, Portal, Content, Arrow} from '@radix-ui/react-dropdown-menu';
import { DropdownMenuProps } from './types';

const DropdownMenu = ({ children, options }: DropdownMenuProps) => {
    return (
        <Root>
            <Trigger asChild>
                {children}
            </Trigger>

            <Portal>
                <Content
                    className="dropsown--menu__content bg-white p-4 rounded shadow-menu"
                    sideOffset={5}
                    side='bottom'
                    align='end'
                >
                    {options}

                    <Arrow height={10} width={20} className="fill-white" />
                </Content>
            </Portal>
        </Root>
    );
};

export default DropdownMenu;