import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { getCurrentUser } from '../../../backend/utils/getCurrentUser';
import { Button } from '../../../components/common/Button';
import { FormField } from '../../../components/common/FormField';
import { DashboardScreen } from '../../../components/screens/Dashboard/DashboardScreen';
import { createNamespace } from '../../../services/namespaces';

type FormState = { name: string };

export default function NewNamespace() {
  const { register, handleSubmit, errors } = useForm<FormState>();
  const { push } = useRouter();

  const onSubmit = async ({ name }: FormState) => {
    try {
      const namespace = await createNamespace(name);

      await push(`/admin/namespace/${namespace.id}?tab=settings`);
    } catch (error) {
      //
    }
  };

  return (
    <DashboardScreen>
      <div className='px-4 mt-10 max-w-lg'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            id='name'
            name='name'
            label='Namespace name'
            ref={register({ required: 'Name is required' })}
          />
          <footer className='mt-3'>
            <div className='flex justify-between items-center'>
              <Link href='/admin'>
                <a>Go back</a>
              </Link>
              <Button color='primary' type='submit'>
                Create
              </Button>
            </div>
            {errors.name && (
              <div className='flex justify-center text-pink-600'>
                {errors.name.message}
              </div>
            )}
          </footer>
        </form>
      </div>
    </DashboardScreen>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    await getCurrentUser(req, res);
    return { props: {} };
  } catch (e) {
    return { notFound: true };
  }
};
