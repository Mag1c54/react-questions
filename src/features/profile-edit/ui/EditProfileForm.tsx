import { useMemo, useState, type ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FormProvider, useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiArrowRight } from "react-icons/fi";
import { useUpdateProfileMutation, useUpdateUserMutation } from "@/entities/profile/api/profileApi";
import type { Profile } from "@/entities/profile/model/types";
import type { AuthUser } from "@/entities/session/model/types";
import { Alert, Button, Card, TabPanel, Tabs } from "@/shared/ui";
import { describeProfileError } from "../model/errors";
import { buildDefaultValues, buildProfilePayload, buildUserPayload } from "../model/payloads";
import { createProfileEditSchema, type ProfileEditValues } from "../model/schema";
import {
  getTabWithError,
  parseTab,
  PROFILE_EDIT_TABS,
  TAB_ITEMS,
  TABS_ID_PREFIX,
  type ProfileEditTabId,
} from "../model/tabs";
import { AboutTab } from "./tabs/AboutTab";
import { PersonalInfoTab } from "./tabs/PersonalInfoTab";
import { SkillsTab } from "./tabs/SkillsTab";
import "./EditProfileForm.scss";

interface EditProfileFormProps {
  user: AuthUser;
  profile: Profile;
  specializationSlot: ReactNode;
}

export const EditProfileForm = ({ user, profile, specializationSlot }: EditProfileFormProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<ProfileEditTabId>(() => parseTab(searchParams.get("tab")));

  const [updateUser] = useUpdateUserMutation();
  const [updateProfile] = useUpdateProfileMutation();

  const schema = useMemo(() => createProfileEditSchema(user.username), [user.username]);

  const methods = useForm<ProfileEditValues>({
    resolver: zodResolver(schema),
    defaultValues: buildDefaultValues(user, profile),
  });
  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const tabIndex = PROFILE_EDIT_TABS.findIndex((item) => item.id === tab);
  const isLastTab = tabIndex === PROFILE_EDIT_TABS.length - 1;

  const onInvalid = (formErrors: FieldErrors<ProfileEditValues>) => {
    const tabWithError = getTabWithError(formErrors);
    if (tabWithError) setTab(tabWithError);
  };

  const onSubmit = async (values: ProfileEditValues) => {
    const userPayload = buildUserPayload(user, values);

    try {
      if (Object.keys(userPayload).length > 0) {
        await updateUser({ id: user.id, body: userPayload }).unwrap();
      }

      await updateProfile({
        id: profile.id,
        body: buildProfilePayload(user, profile, values),
      }).unwrap();

      navigate(`/profile?profile=${profile.id}`);
    } catch (err) {
      setError("root.server", { type: "server", message: describeProfileError(err) });
    }
  };

  const panelProps = { idPrefix: TABS_ID_PREFIX, className: "profile-edit__panel" };

  return (
    <Card as="section" padding="lg" radius="lg" shadow>
      <FormProvider {...methods}>
        <form className="profile-edit" onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
          <h1 className="profile-edit__title">Редактирование профиля</h1>

          <Tabs
            label="Разделы профиля"
            idPrefix={TABS_ID_PREFIX}
            items={TAB_ITEMS}
            value={tab}
            onChange={(id) => setTab(id as ProfileEditTabId)}
          />

          {errors.root?.server && <Alert>{errors.root.server.message}</Alert>}

          <TabPanel {...panelProps} id="personal" active={tab === "personal"}>
            <PersonalInfoTab user={user} specializationSlot={specializationSlot} />
          </TabPanel>

          <TabPanel {...panelProps} id="about" active={tab === "about"}>
            <AboutTab />
          </TabPanel>

          <TabPanel {...panelProps} id="skills" active={tab === "skills"}>
            <SkillsTab profile={profile} />
          </TabPanel>

          <div className="profile-edit__footer">
            {isLastTab ? (
              <Button
                key="save"
                type="submit"
                size="lg"
                isLoading={isSubmitting}
                loadingText="Сохраняем..."
              >
                Сохранить
              </Button>
            ) : (
              <Button
                key="next"
                size="lg"
                rightIcon={<FiArrowRight aria-hidden="true" />}
                onClick={() => setTab(PROFILE_EDIT_TABS[tabIndex + 1].id)}
              >
                Далее
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </Card>
  );
};
