'use client';

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

// Type definition for the modal's props
interface ModalProps {
	isOpen?: boolean;
	onClose: () => void;
	onSubmit: () => void;
	title?: string;
	body?: React.ReactElement;
	footer?: React.ReactElement;
	actionLabel: string;
	disabled?: boolean;
	secondaryAction?: () => void;
	secondaryActionLabel?: string;

}

// The main Modal component
const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	title,
	body,
	footer,
	actionLabel,
	disabled,
	secondaryAction,
  	secondaryActionLabel
}) => {
	// State to control whether to show the modal or not
	const [ showModal, setShowModal] = useState(isOpen);

	// When the isOpen prop changes, update the showModal state
	useEffect(() => {
		setShowModal(isOpen);
	}, [isOpen])

	// Handler for closing the modal
	const handleClose = useCallback(
		() => {
			if (disabled){
				return;
			}
			
			setShowModal(false);
			setTimeout(() => {
				onClose();
			}, 300);
		},
		[disabled, onClose],
	);
	
	// Handler for submitting the modal's form/data
	const handleSubmit = useCallback(
		() => {
			if (disabled) {
				return;
			}
			onSubmit();
		},
		[disabled, onSubmit],
	);

	// Handler for the secondary action in the modal (like a secondary button)
	const handleSecondaryAction = useCallback(
		() => {
			if (disabled || !secondaryAction){
				return;
			}
			secondaryAction();
		},
		[disabled, secondaryAction],
	)
	
	// If the modal is not open, render nothing
	if (!isOpen){
		return null;
	}
	
	// Render the modal
  return (
    <>
			<div
				className="
					justify-center
					items-center
					flex
					overflow-x-hidden
					overflow-y-auto
					fixed
					inset-0
					z-50
					outline-none
					focus:outline-none
					bg-neutral-800/70				
				">
					<div
					className="
						relative
						w-full
						md:w-4/6
						lg:w-3/6
						xl:w-2/5
						my-6
						mx-auto
						h-full
						lg:h-auto
						md:h-auto	
					">
						{/* CONTENT */}
						<div
						className={`
							translate
							duration-300
							h-full
							${showModal ? 'translate-x-0' : 'translate-y-full'}
							${showModal ? 'opacity-100' : 'opacity-0'}
						`}>
							<div className="
								translate
								h-full
								lg:h-auto
								md:h-auto
								border-0
								rounded-lg
								shadow-lg
								relative
								flex
								flex-col
								w-full
								bg-white
								outline-none
								focus:outline-none
							">
									<div className="
										flex
										items-center
										p-6
										rounded-t
										justify-center
										relative
										border-b-[1px]									
									">										
										<button 
											onClick={handleClose}
											className="
												p-1
												border-0
												hover:opacity-70
												transition
												absolute
												left-9
										">
											<IoMdClose size={18} />
										</button>										
										<div className="text-lg font-bold">
											{title}
										</div>
									</div>
									{/* BODY */}
									<div className="relative p-6 flex-auto">
										{body}
									</div>
									{/* FOOTER */}
									<div className="flex flex-col gap-2 p-6">
										<div className="
											flex
											flex-row
											items-center
											gap-4
											w-full
										">
											{secondaryAction && secondaryActionLabel && (
												<Button
													outline
													disabled={disabled}
													label={secondaryActionLabel}
													onClick={handleSecondaryAction}												
												/>
											)}
											{/* Main Modal Button, eg: sign up */}
											<Button  
												disabled={disabled}
												label={actionLabel}
												onClick={handleSubmit}
											/>

										</div>
										{footer}
									</div>
							</div>
						</div>
					</div>
			</div>
		</>
  );
}

export default Modal;