package dam.saruman.model;

import jakarta.persistence.*;

@Entity
@Table(name = "enemigos")
public class Enemigo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String nombre;

    @Column
    private String pais;

    @Column
    private String afiliacion_politica;

    public Enemigo(long id, String nombre, String pais, String afiliacion) {
        this.id = id;
        this.nombre = nombre;
        this.pais = pais;
        this.afiliacion_politica = afiliacion;
    }

    public Enemigo() {

    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String Name) {
        this.nombre = Name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public String getAfiliacion_politica() {
        return afiliacion_politica;
    }

    public void setAfiliacion_politica(String afiliacion_politica) {
        this.afiliacion_politica = afiliacion_politica;
    }
}
