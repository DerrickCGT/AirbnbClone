'use client';

import { useMemo, useState } from "react";
import useRentModal from "@/app/hooks/useRentModal"
import Modal from "./Modal"
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

const RentModal = () => {
  const router = useRouter()
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const [isLoading, setIsLoading] = useState(false);

  // Destructuring useForm to get necessary methods and properties for form management.
  const{
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { 
      errors,
    },            // Object containing any form validation errors.
    reset         // Function to reset the form fields to their default values.
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: ''
    }
  });

  // Using the watch function to get the current value of the 'category' input.
  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  // dynamically import Map under SSR
  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false
  }), [location]);

  // setValue by default indeed set the value but do not re-rendering the page.
  // Custom function is used to re-rendering the page.
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios.post('/api/listings', data)
    .then(() => {
      toast.success('Listing Created');
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY);
      rentModal.onClose();
    })
    .catch(() => {
      toast.error('Something went wrong');
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE){
      return 'Create';
    }

    return 'Next';
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY){
      return undefined;
    }

    return 'Back';
  }, [step])
  
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best decribes your place?"
        subtitle="Pick a category" 
      />
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-3
          max-h-[50vh]
          overflow-y-auto
        ">
          {categories.map((item) => (
            <div 
              key={item.label} 
              className="col-span-1">
                <CategoryInput 
                  onClick={(category) => 
                    {setCustomValue('category', category)}}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
            </div>
          ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect 
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        <Map 
          center={location?.latlng}
        />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Please provide descriptions about your place"
          subtitle="What amenities do you have?"
        />
        <Counter 
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter 
          title="Rooms"
          subtitle="How many rooms available in the property?"
          value={roomCount}
          onChange={(value) => setCustomValue('roomCount', value)}
        />
        <hr />
        <Counter 
          title="Bathrooms"
          subtitle="How many bathrooms available in the property?"
          value={bathroomCount}
          onChange={(value) => setCustomValue('bathroomCount', value)}
        />
      
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Add a photo of your property"
          subtitle="Show guests what your property looks like"
        />
        <ImageUpload 
          value={imageSrc}
          onChange={(value) => setCustomValue('imageSrc', value)}
        />

      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="How would you describe your place"
          subtitle="Short and sweet works best!"
        />
        <Input 
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        /> 
        <hr />
        <Input 
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        /> 
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
      <Heading 
        title="Set your price"
        subtitle="How much do you charge per night?"
      />
      <hr />
      <Input 
        id="price"
        label="Price"
        formatPrice
        disabled={isLoading}
        type="number"        
        register={register}
        errors={errors}
        required
      />
      </div>
    )
  }

  return (
    <Modal 
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home!"
      body={bodyContent}
    />
  )
}

export default RentModal;