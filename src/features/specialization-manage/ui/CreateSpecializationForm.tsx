import { useNavigate } from "react-router-dom";
import { useCreateSpecializationMutation } from "@/entities/specialization/api/specializationApi";
import { ADMIN_ROUTES } from "@/shared/config/routes";
import { stripDataUrlPrefix } from "@/shared/lib/isHttpUrl";
import type { SpecializationFormValues } from "../model/schema";
import { SpecializationForm } from "./SpecializationForm";

export const CreateSpecializationForm = () => {
  const navigate = useNavigate();
  const [createSpecialization] = useCreateSpecializationMutation();

  const handleSubmit = async (values: SpecializationFormValues) => {
    await createSpecialization({
      title: values.title,
      description: values.description,
      specializationImage: stripDataUrlPrefix(values.image),
    }).unwrap();

    navigate(ADMIN_ROUTES.specializations);
  };

  return <SpecializationForm backTo={ADMIN_ROUTES.specializations} onSubmit={handleSubmit} />;
};
