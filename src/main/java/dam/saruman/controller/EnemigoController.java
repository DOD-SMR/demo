package dam.saruman.controller;

import dam.saruman.model.Enemigo;
import dam.saruman.service.EnemigoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EnemigoController {
    @Autowired
    private EnemigoService enemigoService;

    @GetMapping("/enemigo")
    public List<Enemigo> obtenerEnemigos(){
        return  enemigoService.obtenerTodos();
    }
    @GetMapping("/enemigo/{id}")
    public Enemigo obtenerEnemigo(@PathVariable String id){
        return enemigoService.obtenerEnemigo(id);
    }
    @PostMapping("/enemigo")
    public Enemigo crearEnemigo(@RequestBody Enemigo enemigo){
        return enemigoService.guardar(enemigo);
    }
    @PutMapping("/enemigo/{id}")
    public Enemigo editarEnemigo(@PathVariable String id ,@RequestBody Enemigo e){
        return enemigoService.editarEnemigo(id,e);
    }




}
