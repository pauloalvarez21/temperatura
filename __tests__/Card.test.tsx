import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import Card from '../src/components/Card';

describe('Card Component', () => {
  test('se renderiza correctamente con contenido (children)', () => {
    const tree = renderer.create(
      <Card>
        <Text>Contenido de prueba</Text>
      </Card>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('se aplica el estilo personalizado pasado por props', async () => {
    const customStyle = { backgroundColor: 'red' };
    let component: any;
    
    await renderer.act(() => {
      component = renderer.create(
        <Card style={customStyle}>
          <Text>Test</Text>
        </Card>
      );
    });
    
    const instance = component.toJSON();
    expect(instance).not.toBeNull();
    
    // Verificamos si el estilo red está en el objeto de estilos
    // props.style puede ser un array debido a [styles.card, style] en Card.tsx
    const styles = instance.props.style;
    const hasRedBackground = Array.isArray(styles) 
      ? styles.some(s => s && s.backgroundColor === 'red')
      : styles && styles.backgroundColor === 'red';
      
    expect(hasRedBackground).toBe(true);
  });
});
