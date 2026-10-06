import { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { AppInput } from '../components/common/app-input';
import { AppButton } from '../components/common/app-button';

import {
  validarObligatorio,
  validarCantidad,
} from '../utils/validators';

export default function PedidoProducto() {

  const [cliente, setCliente] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [direccion, setDireccion] = useState('');

  const [error, setError] = useState('');
  const [registrado, setRegistrado] = useState(false);

  const clienteValido = validarObligatorio(cliente);
  const productoValido = validarObligatorio(producto);
  const cantidadValida = validarCantidad(cantidad);
  const direccionValida = validarObligatorio(direccion);

  const validarFormulario = () => {

    setError('');
    setRegistrado(false);

    if (!clienteValido) {
      setError('Ingresa el nombre del cliente.');
      return;
    }

    if (!productoValido) {
      setError('Ingresa el nombre del producto.');
      return;
    }

    if (!cantidadValida) {
      setError('La cantidad debe ser un número mayor a 0.');
      return;
    }

    if (!direccionValida) {
      setError('Ingresa la dirección de entrega.');
      return;
    }

    setRegistrado(true);
  };

  const resetForm = () => {
    setCliente('');
    setProducto('');
    setCantidad('');
    setDireccion('');
    setError('');
    setRegistrado(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* ENCABEZADO */}

        <View style={styles.header}>

          <View style={styles.headerIcon}>
            <Text style={styles.headerIconText}>
              +
            </Text>
          </View>

          <View>
            <Text style={styles.overline}>
              NUEVO PEDIDO
            </Text>

            <Text style={styles.title}>
              Pedido de Producto
            </Text>
          </View>

        </View>


        <Text style={styles.description}>
          Completa los datos para registrar un nuevo pedido.
        </Text>


        {/* TARJETA DEL FORMULARIO */}

        <View style={styles.formCard}>

          <Text style={styles.sectionTitle}>
            Detalles del pedido
          </Text>

          <Text style={styles.sectionDescription}>
            Todos los campos son obligatorios.
          </Text>


          {/* CLIENTE */}

          <AppInput
            label="Cliente"
            placeholder="Nombre del cliente"
            value={cliente}
            onChangeText={(value) => {
              setCliente(value);
              setError('');
              setRegistrado(false);
            }}
          />

          {cliente.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                clienteValido
                  ? styles.validText
                  : styles.invalidText,
              ]}
            >
              {clienteValido
                ? '✓ Cliente válido'
                : '○ Ingresa el cliente'}
            </Text>
          )}


          {/* PRODUCTO */}

          <AppInput
            label="Producto"
            placeholder="Nombre del producto"
            value={producto}
            onChangeText={(value) => {
              setProducto(value);
              setError('');
              setRegistrado(false);
            }}
          />

          {producto.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                productoValido
                  ? styles.validText
                  : styles.invalidText,
              ]}
            >
              {productoValido
                ? '✓ Producto válido'
                : '○ Ingresa el producto'}
            </Text>
          )}


          {/* CANTIDAD */}

          <AppInput
            label="Cantidad"
            placeholder="Ej: 1, 2, 3..."
            value={cantidad}
            onChangeText={(value) => {
              setCantidad(value);
              setError('');
              setRegistrado(false);
            }}
            keyboardType="numeric"
          />

          {cantidad.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                cantidadValida
                  ? styles.validText
                  : styles.invalidText,
              ]}
            >
              {cantidadValida
                ? '✓ Cantidad válida'
                : '○ Debe ser mayor a 0'}
            </Text>
          )}

          {/* DIRECCIÓN */}

          <AppInput
            label="Dirección"
            placeholder="Dirección de entrega"
            value={direccion}
            onChangeText={(value) => {
              setDireccion(value);
              setError('');
              setRegistrado(false);
            }}
          />

          {direccion.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                direccionValida
                  ? styles.validText
                  : styles.invalidText,
              ]}
            >
              {direccionValida
                ? '✓ Dirección válida'
                : '○ Ingresa la dirección'}
            </Text>
          )}


          {/* ERROR */}

          {error !== '' && (
            <View style={styles.errorBox}>

              <View style={styles.errorIcon}>
                <Text style={styles.errorIconText}>
                  !
                </Text>
              </View>

              <View style={styles.messageContainer}>

                <Text style={styles.errorTitle}>
                  No se pudo registrar
                </Text>

                <Text style={styles.errorMessage}>
                  {error}
                </Text>

              </View>

            </View>
          )}


          {/* ÉXITO */}

          {registrado && (
            <View style={styles.successBox}>

              <View style={styles.successIcon}>
                <Text style={styles.successIconText}>
                  ✓
                </Text>
              </View>

              <View style={styles.messageContainer}>

                <Text style={styles.successTitle}>
                  ¡Pedido registrado!
                </Text>

                <Text style={styles.successMessage}>
                  El pedido se procesó correctamente.
                </Text>

              </View>

            </View>
          )}


          {/* BOTÓN */}

          <AppButton
            title={registrado ? "Registrar otro pedido" : "Registrar pedido"}
            onPress={registrado ? resetForm : validarFormulario}
          />

        </View>


        {/* VALIDACIONES */}

        <View style={styles.validationSection}>

          <View style={styles.validationHeader}>

            <View>
              <Text style={styles.validationTitle}>
                Validaciones
              </Text>

              <Text style={styles.validationSubtitle}>
                Reglas aplicadas al formulario
              </Text>
            </View>

            <View style={styles.counter}>

              <Text style={styles.counterText}>
                {
                  [
                    clienteValido && productoValido,
                    cantidadValida,
                    direccionValida,
                  ].filter(Boolean).length
                }/3
              </Text>

            </View>

          </View>


          {/* VALIDACIÓN 1 */}

          <ValidationRow
            title="Campos obligatorios"
            description="Cliente y producto son requeridos."
            valid={clienteValido && productoValido}
          />


          {/* VALIDACIÓN 2 */}

          <ValidationRow
            title="Cantidad > 0"
            description="La cantidad debe ser mayor a 0."
            valid={cantidadValida}
          />


          {/* VALIDACIÓN 3 */}

          <ValidationRow
            title="Dirección req."
            description="La dirección es requerida."
            valid={direccionValida}
          />

        </View>


        {/* PIE */}

        <Text style={styles.footer}>
          Formulario de pedido con validaciones
        </Text>

      </ScrollView>

    </KeyboardAvoidingView>
  );
}


/* COMPONENTE PARA LAS VALIDACIONES */

type ValidationRowProps = {
  title: string;
  description: string;
  valid: boolean;
};

function ValidationRow({
  title,
  description,
  valid,
}: ValidationRowProps) {

  return (
    <View style={styles.validationRow}>

      <View
        style={[
          styles.validationCircle,
          valid
            ? styles.validationCircleValid
            : styles.validationCirclePending,
        ]}
      >

        <Text
          style={[
            styles.validationIcon,
            valid
              ? styles.validationIconValid
              : styles.validationIconPending,
          ]}
        >
          {valid ? '✓' : '○'}
        </Text>

      </View>


      <View style={styles.validationInfo}>

        <Text style={styles.validationRowTitle}>
          {title}
        </Text>

        <Text style={styles.validationRowDescription}>
          {description}
        </Text>

      </View>


      <View
        style={[
          styles.statusBadge,
          valid
            ? styles.statusBadgeValid
            : styles.statusBadgePending,
        ]}
      >

        <Text
          style={[
            styles.statusBadgeText,
            valid
              ? styles.statusBadgeTextValid
              : styles.statusBadgeTextPending,
          ]}
        >
          {valid ? 'OK' : 'Pendiente'}
        </Text>

      </View>

    </View>
  );
}


/* ESTILOS */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  scroll: {
    padding: 20,
    paddingTop: 45,
    paddingBottom: 35,
  },


  /* HEADER */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  headerIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  headerIconText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '300',
  },

  overline: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6366F1',
    letterSpacing: 1.5,
    marginBottom: 3,
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#172033',
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: '#667085',
    marginBottom: 24,
  },


  /* FORMULARIO */

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E8EBF0',
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#172033',
    marginBottom: 4,
  },

  sectionDescription: {
    fontSize: 13,
    color: '#98A2B3',
    marginBottom: 22,
  },


  /* ESTADO DE CAMPOS */

  fieldStatus: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: -10,
    marginBottom: 14,
  },

  validText: {
    color: '#16A34A',
  },

  invalidText: {
    color: '#D97706',
  },


  /* ERROR */

  errorBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF5F5',
    borderRadius: 14,
    padding: 13,
    marginBottom: 17,
    borderWidth: 1,
    borderColor: '#FECACA',
  },

  errorIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  errorIconText: {
    color: '#DC2626',
    fontSize: 17,
    fontWeight: '800',
  },

  messageContainer: {
    flex: 1,
  },

  errorTitle: {
    color: '#991B1B',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },

  errorMessage: {
    color: '#B42318',
    fontSize: 12,
    lineHeight: 17,
  },


  /* ÉXITO */

  successBox: {
    flexDirection: 'row',
    backgroundColor: '#F0FDF4',
    borderRadius: 14,
    padding: 13,
    marginBottom: 17,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },

  successIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  successIconText: {
    color: '#16A34A',
    fontSize: 17,
    fontWeight: '800',
  },

  successTitle: {
    color: '#166534',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },

  successMessage: {
    color: '#15803D',
    fontSize: 12,
  },


  /* VALIDACIONES */

  validationSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E8EBF0',
  },

  validationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  validationTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#172033',
    marginBottom: 3,
  },

  validationSubtitle: {
    fontSize: 12,
    color: '#98A2B3',
  },

  counter: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  counterText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '800',
  },


  /* FILAS */

  validationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderTopWidth: 1,
    borderTopColor: '#F0F2F5',
  },

  validationCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  validationCircleValid: {
    backgroundColor: '#DCFCE7',
  },

  validationCirclePending: {
    backgroundColor: '#F3F4F6',
  },

  validationIcon: {
    fontSize: 17,
    fontWeight: '800',
  },

  validationIconValid: {
    color: '#16A34A',
  },

  validationIconPending: {
    color: '#98A2B3',
  },

  validationInfo: {
    flex: 1,
  },

  validationRowTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#344054',
    marginBottom: 3,
  },

  validationRowDescription: {
    fontSize: 11,
    color: '#98A2B3',
    lineHeight: 16,
  },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 8,
  },

  statusBadgeValid: {
    backgroundColor: '#ECFDF3',
  },

  statusBadgePending: {
    backgroundColor: '#F2F4F7',
  },

  statusBadgeText: {
    fontSize: 9,
    fontWeight: '800',
  },

  statusBadgeTextValid: {
    color: '#027A48',
  },

  statusBadgeTextPending: {
    color: '#667085',
  },


  /* FOOTER */

  footer: {
    textAlign: 'center',
    fontSize: 11,
    color: '#98A2B3',
    marginTop: 22,
  },

});