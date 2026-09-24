import { StatusChip } from '@common/components/StatusChip';
import { customRender } from '@test-utils/CustomRender';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('customRender', () => {
  it('monta el componente con el tema y un caché de SWR aislado', () => {
    customRender(<StatusChip tone="OK" label="Activo" />);
    expect(screen.getByText('Activo')).toBeInTheDocument();
  });
});
