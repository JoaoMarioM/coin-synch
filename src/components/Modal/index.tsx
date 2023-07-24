"use client"

import { ComponentProps, useCallback, useEffect, useRef } from "react";
import { Container } from "../Container";
import Button from "../Button";
import { useRouter } from "next/navigation";

interface Props extends ComponentProps<"div"> {
    isOpen?: boolean;
    header: React.ReactNode;
    onDismiss: (value: boolean) => void;
}

const Modal = ({
    isOpen,
    header,
    children,
    onDismiss
}: Props) => {
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    const handleClose = useCallback(() => {
        if (onDismiss) {
            onDismiss(false)
            return
        };

        router.back();
    }, [router, onDismiss]);

    const onClick = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (
            event.target === overlayRef.current ||
            event.target === containerRef.current
        ) 
        handleClose();
    }, [handleClose, overlayRef, containerRef]);

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === "Escape") handleClose();
    }, [handleClose]);

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    if (!isOpen) return <></>

    return (
        <div
            ref={overlayRef}
            onClick={onClick}
            className="w-full h-full fixed inset-0 bg-default/60 z-50 flex items-center justify-center"
        >
            <Container ref={containerRef}>
                <div className="col-span-4 rounded-lg bg-white p-4 xl:col-start-5 md:col-start-3">
                    <div className="relative flex items-center justify-center px-4 mb-6">
                        {header}
                        <Button
                            onClick={handleClose}
                            suffix="close"
                            variant="text"
                            iconClassname="w-4 h-4"
                            className="absolute top-0 right-0 !p-0"
                        />
                    </div>
                    {children}
                </div>
            </Container>
        </div>
    );
};


export default Modal