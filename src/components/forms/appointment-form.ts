"use client"

import { Appointment } from "@/@types/appwrite.types";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export interface AppointmentFormProps {
    userId: string;
    patientId: string;
    type: "create" | "schedule" | "cancel";
    appointment?: Appointment;
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function AppointmentForm(appointmentFormProps: AppointmentFormProps) {
    const route = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    return ()
}