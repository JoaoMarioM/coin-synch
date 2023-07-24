import {
  Root,
  Arrow,
  Portal,
  Trigger,
  Content,
  Provider,
  TooltipContentProps,
} from '@radix-ui/react-tooltip';

interface Props extends TooltipContentProps {
  children: React.ReactNode;
  label: string;
}

const Tooltip = ({ label, children, ...props }: Props) => {
  return (
    <Provider delayDuration={300}>
      <Root>
        <Trigger>{children}</Trigger>
        <Portal>
          <Content
            className='label py-2 px-6 bg-primary-500 text-white rounded-[4px]'
            {...props}
          >
            {label}
            <Arrow className='fill-primary-500' />
          </Content>
        </Portal>
      </Root>
    </Provider>
  );
};

export default Tooltip;
