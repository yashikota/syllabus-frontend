import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import MaterialReactTable, {
  MRT_ColumnDef,
  Virtualizer,
} from 'material-react-table';
import { SortingState } from '@tanstack/react-table';
import { faker } from '@faker-js/faker';

export type Person = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  petName: string;
  age: number;
};

export const makeData = (numberOfRows: number) =>
  [...Array(numberOfRows).fill(null)].map(() => ({
    firstName: faker.name.firstName(),
    middleName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    address: faker.address.streetAddress(),
    zipCode: faker.address.zipCode(),
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.country(),
    petName: faker.animal.cat(),
    age: faker.datatype.float({ min: 0, max: 100 }),
  }));

const Example: FC = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'middleName',
        header: 'Middle Name',
        size: 150,
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'email',
        header: 'Email Address',
        size: 300,
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'zipCode',
        header: 'Zip Code',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
      {
        accessorKey: 'country',
        header: 'Country',
      },
      {
        accessorKey: 'petName',
        header: 'Pet Name',
      },
      {
        accessorKey: 'age',
        header: 'Age',
      },
    ],
    [],
    //end
  );

  //optionally access the underlying virtualizer instance
  const virtualizerInstanceRef = useRef<Virtualizer>(null);

  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setData(makeData(10_000));
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (virtualizerInstanceRef.current) {
      //scroll to the top of the table when the sorting changes
      virtualizerInstanceRef.current.scrollToIndex(0);
    }
  }, [sorting]);

  return (
    <MaterialReactTable
      columns={columns}
      data={data} //10,000 rows
      enableBottomToolbar={false}
      enableGlobalFilterModes
      enablePagination={false}
      enableRowNumbers
      enableRowVirtualization
      initialState={{ density: 'compact' }}
      muiTableContainerProps={{ sx: { maxHeight: '100%' } }}
      onSortingChange={setSorting}
      state={{ isLoading, sorting }}
      virtualizerInstanceRef={virtualizerInstanceRef} //optional
      virtualizerProps={{ overscan: 20 }} //optionally customize the virtualizer
    />
  );
};

export default Example;
